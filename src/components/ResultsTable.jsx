import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ResultsTable = ({ data, title }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Código de Negociação</TableCell>
                        <TableCell align="right">Quantidade</TableCell>
                        <TableCell align="right">Preço Médio</TableCell>
                        <TableCell align="right">Valor</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {item['Código de Negociação']}
                            </TableCell>
                            <TableCell align="right">{item['Quantidade'].toString().replace(".", ",")}</TableCell>
                            <TableCell align="right">{item['Preço Médio'].toFixed(2).toString().replace(".", ",")}</TableCell>
                            <TableCell align="right">R$ {(item['Preço Médio'] * item['Quantidade']).toFixed(2).toString().replace(".", ",")}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ResultsTable;
