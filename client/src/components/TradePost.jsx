import React from 'react';
import { Card, CardContent, Typography,CardHeader,IconButton,CardActions,Divider } from '@mui/material';
import FlexBetween from './FlexBetween';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTrade } from "state";
import WidgetWrapper from './WidgetWrapper';

const TradePost = ({
  tradeId,
  tradeUserID,
  tradeType,
  premium,
  username,
  ticker,
  note,
  date,
  expiryDate,
  profitLoss,
}) => {


  return (

    <Card sx={{ 
      border: '0.2px solid white',
      maxWidth: 400,
      minHeight: 250,
      ml: 40,
      mt: 3  }}>
        <CardHeader
            title={username}
          
        />
        <Divider/>
        <CardContent>
        <Typography variant="h4" color="text.secondary">
           {ticker} 
            </Typography>
            </CardContent>

            <CardContent>
            <Typography variant="h4" color="text.secondary">
           {tradeType} | Premium: {premium}
            </Typography>
            </CardContent>
        
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                Note: {note}
            </Typography>
        </CardContent>
        <Divider/>
        <CardActions disableSpacing>
            <Typography variant="body2" color="text.secondary">
                Posted on: {new Date(date).toLocaleDateString()}
            </Typography>
            <IconButton
                aria-label="share"
                style={{ marginTop:'auto', marginLeft: 'auto' }}  // pushes the expiry date to the right
            >
                <Typography variant="body2" color="text.secondary">
                    Expires on: {new Date(expiryDate).toLocaleDateString()}
                </Typography>
            </IconButton>
        </CardActions>
    </Card>

);

}

export default TradePost;
