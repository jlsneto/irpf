import React from 'react';
import { Box, Typography } from '@mui/material';

const StockDetails = ({ stockData }) => {
    if (!stockData) return null;

    const lastRefreshed = stockData['Meta Data']['3. Last Refreshed'];
    const timeSeries = stockData['Time Series (Daily)'][lastRefreshed];

    return (
        <Box>
            <Typography variant="h4">Detalhes do Ativo</Typography>
            <Typography variant="body1"><strong>Última Atualização:</strong> {lastRefreshed}</Typography>
            <Typography variant="body1"><strong>Abertura:</strong> {timeSeries['1. open']}</Typography>
            <Typography variant="body1"><strong>Alta:</strong> {timeSeries['2. high']}</Typography>
            <Typography variant="body1"><strong>Baixa:</strong> {timeSeries['3. low']}</Typography>
            <Typography variant="body1"><strong>Fechamento:</strong> {timeSeries['4. close']}</Typography>
            <Typography variant="body1"><strong>Volume:</strong> {timeSeries['5. volume']}</Typography>
        </Box>
    );
};

export default StockDetails;
