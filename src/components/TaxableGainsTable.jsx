import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TaxableGainsTable = ({ data }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Data da Negociação</TableCell>
                        <TableCell>Código de Negociação</TableCell>
                        <TableCell align="right">Quantidade</TableCell>
                        <TableCell align="right">Preço Médio</TableCell>
                        <TableCell align="right">Preço Venda</TableCell>
                        <TableCell align="right">Ganho de Capital</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item['Data da Negociação']}</TableCell>
                            <TableCell>{item['Código de Negociação']}</TableCell>
                            <TableCell align="right">{item['Quantidade']}</TableCell>
                            <TableCell align="right">R$ {item['Preço Médio'].toFixed(2).toString().replace(".", ",")}</TableCell>
                            <TableCell align="right">R$ {item['Preço Venda'].toFixed(2).toString().replace(".", ",")}</TableCell>
                            <TableCell align="right">R$ {item['Ganho de Capital'].toFixed(2).toString().replace(".", ",")}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TaxableGainsTable;
