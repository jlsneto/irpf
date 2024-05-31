import React, { useState } from 'react';
import Papa from 'papaparse';
import { Container, Typography, Box, Alert } from '@mui/material';
import FileUploader from './components/FileUploader';
import ResultsTable from './components/ResultsTable';
import CapitalGainsTable from './components/CapitalGainsTable';
import PortfolioChart from './components/PortfolioChart';
import CapitalGainsChart from './components/CapitalGainsChart';
import TaxableGainsTable from './components/TaxableGainsTable';

const App = () => {
    const [portfolio, setPortfolio] = useState([]);
    const [capitalGains, setCapitalGains] = useState([]);
    const [taxableGainsDetails, setTaxableGainsDetails] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [totalGains, setTotalGains] = useState(0);
    const [taxableGains, setTaxableGains] = useState(0);
    const [taxDue, setTaxDue] = useState(0);
    const LIMIT_ISENCAO = 20000;

    const processCSV = (data) => {
        const compras = data.filter((row) => row['Tipo de Movimentação'] === 'Compra');
        const vendas = data.filter((row) => row['Tipo de Movimentação'] === 'Venda');
        const posicao_inicial = data.filter((row) => row['Tipo de Movimentação'] === 'Posição');

        let portfolio = {};

        posicao_inicial.forEach((row) => {
            const codigo = row['Código de Negociação'];
            portfolio[codigo] = {
                quantidade: parseInt(row['Quantidade']),
                preco_medio: parseFloat(row['Preço'].replace('R$', '').replace(',', '.'))
            };
        });

        compras.forEach((row) => {
            const codigo = row['Código de Negociação'];
            const quantidade = parseInt(row['Quantidade']);
            const preco = parseFloat(row['Preço'].replace('R$', '').replace(',', '.'));

            if (portfolio[codigo]) {
                const total_valor = (portfolio[codigo].quantidade * portfolio[codigo].preco_medio) + (quantidade * preco);
                const total_quantidade = portfolio[codigo].quantidade + quantidade;
                portfolio[codigo].preco_medio = total_valor / total_quantidade;
                portfolio[codigo].quantidade = total_quantidade;
            } else {
                portfolio[codigo] = {
                    quantidade: quantidade,
                    preco_medio: preco
                };
            }
        });

        let monthlySales = {};
        let allGainsDetails = [];
        let taxableGainsDetails = [];
        let totalGains = 0;
        let totalSales = 0;

        vendas.forEach((row) => {
            const codigo = row['Código de Negociação'];
            const quantidade = parseInt(row['Quantidade']);
            const preco = parseFloat(row['Preço'].replace('R$', '').replace(',', '.'));
            const valor = parseFloat(row['Valor'].replace('R$', '').replace('.', '').replace(',', '.'));
            const data = new Date(row['Data do Negócio'].split('/').reverse().join('-'));

            const month = data.getMonth() + 1;
            if (!monthlySales[month]) {
                monthlySales[month] = [];
            }
            monthlySales[month].push({
                codigo,
                quantidade,
                preco,
                valor,
                data: row['Data do Negócio']
            });

            const preco_medio = portfolio[codigo] ? portfolio[codigo].preco_medio : 0;
            const ganho = valor - (quantidade * preco_medio);
            allGainsDetails.push({
                'Código de Negociação': codigo,
                'Quantidade': quantidade,
                'Ganho de Capital': ganho
            });

            if (ganho > 0) {
                totalGains += ganho;
                taxableGainsDetails.push({
                    'Data da Negociação': row['Data do Negócio'],
                    'Código de Negociação': codigo,
                    'Quantidade': quantidade,
                    'Preço Médio': preco_medio,
                    'Preço Venda': preco,
                    'Ganho de Capital': ganho
                });
            }

            if (portfolio[codigo] && portfolio[codigo].quantidade >= quantidade) {
                portfolio[codigo].quantidade -= quantidade;
                if (portfolio[codigo].quantidade === 0) {
                    delete portfolio[codigo];
                }
            }
        });

        Object.keys(monthlySales).forEach((month) => {
            const sales = monthlySales[month];
            const monthlyTotalSales = sales.reduce((acc, sale) => acc + sale.valor, 0);
            if (monthlyTotalSales > LIMIT_ISENCAO) {
                totalSales += monthlyTotalSales;
            }
        });

        setPortfolio(Object.entries(portfolio).map(([codigo, details]) => ({
            'Código de Negociação': codigo,
            'Quantidade': details.quantidade,
            'Preço Médio': details.preco_medio
        })));
        setCapitalGains(allGainsDetails);
        setTotalSales(totalSales);
        setTotalGains(totalGains);

        if (totalSales > LIMIT_ISENCAO) {
            const taxableGains = totalGains;
            const taxDue = taxableGains * 0.15;
            setTaxableGains(taxableGains);
            setTaxDue(taxDue);
            setTaxableGainsDetails(taxableGainsDetails);
        } else {
            setTaxableGains(0);
            setTaxDue(0);
            setTaxableGainsDetails([]);
        }
    };

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            if (file.type === 'application/json') {
                const data = JSON.parse(content);
                processCSV(data);
            } else {
                Papa.parse(content, {
                    header: true,
                    complete: (results) => {
                        processCSV(results.data);
                    }
                });
            }
        };
        reader.readAsText(file);
    };

    return (
        <Container>
            <Typography variant="h3" component="h1" gutterBottom>
                Portfolio Calculator
            </Typography>
            <FileUploader onFileUpload={handleFileUpload} />
            <Box my={4}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Portfolio Final
                </Typography>
                <ResultsTable data={portfolio} />
                <PortfolioChart data={portfolio} />
            </Box>
            <Box my={4}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Ganhos de Capital
                </Typography>
                {totalSales > 0 && totalSales <= LIMIT_ISENCAO ? (
                    <Alert severity="info">
                        Ganhos de Capital Isentos: R$ {totalGains.toFixed(2)}
                    </Alert>
                ) : (
                    <Alert severity="warning">
                        Ganhos de Capital Tributáveis: R$ {taxableGains.toFixed(2)}, Imposto Devido: R$ {taxDue.toFixed(2)}
                    </Alert>
                )}
                <CapitalGainsTable data={capitalGains} />
                <CapitalGainsChart data={capitalGains} />
                {taxableGains > 0 && (
                    <>
                        <Typography variant="h5" component="h3" gutterBottom>
                            Detalhes dos Ganhos de Capital Tributáveis
                        </Typography>
                        <TaxableGainsTable data={taxableGainsDetails} />
                        <Typography variant="body1" component="p" gutterBottom>
                            De acordo com a legislação brasileira, os ganhos de capital auferidos em operações de venda de ações que
                            ultrapassem R$ 20.000,00 em um único mês são tributáveis à alíquota de 15%. O imposto devido deve ser recolhido
                            até o último dia útil do mês subsequente ao da venda das ações. Certifique-se de declarar corretamente esses
                            ganhos e pagar o imposto devido para evitar multas e juros.
                        </Typography>
                    </>
                )}
            </Box>
        </Container>
    );
};

export default App;
