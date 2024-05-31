import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const CapitalGainsTable = ({ data }) => {
    // Agregando dados por código de negociação
    const aggregatedData = data.reduce((acc, item) => {
        const existing = acc.find(i => i['Código de Negociação'] === item['Código de Negociação']);
        if (existing) {
            existing['Quantidade'] += item['Quantidade'];
            existing['Ganho de Capital'] += item['Ganho de Capital'];
        } else {
            acc.push({ ...item });
        }
        return acc;
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Código de Negociação</TableCell>
                        <TableCell align="right">Quantidade</TableCell>
                        <TableCell align="right">Ganho/Perda de Capital</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {aggregatedData.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item['Código de Negociação']}</TableCell>
                            <TableCell align="right">{item['Quantidade'].toString().replace(".", ",")}</TableCell>
                            <TableCell align="right">R$ {item['Ganho de Capital'].toFixed(2).toString().replace(".", ",")}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CapitalGainsTable;
