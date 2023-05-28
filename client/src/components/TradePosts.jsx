import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setTrades} from "state";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Box } from "@mui/material";

import TradePost from "./TradePost";
import TradeRow from "./TradeRow";


const TradePosts = ({userId, isProfile = false}) => {
    const dispatch = useDispatch();
    const trades = useSelector((state) => state.trades);
    console.log(trades)


    const token = useSelector((state) => state.token);


    const getTrades = async () => {
        const response = await fetch("http://localhost:3001/trades", {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        console.log(data)

        dispatch(setTrades({trades:data}));
    };
    console.log(isProfile)
    const getUserTrades = async () => {
        const response = await fetch(`http://localhost:3001/trades/${userId}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        });
        const data = await response.json();

        dispatch(setTrades({trades:data}));
    };

    useEffect(()=> {
        if(isProfile) {
            getUserTrades();
        } else {
            getTrades();
        }
    },[]); 
    

    return (
        <>
{isProfile === true ? (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center', // centers horizontally
        alignItems: 'center',     // centers vertically
        height: 'calc(100vh -30vh)', // take the height of your header into account
        marginLeft: '256px'  // Width of your sidebar
      }}>
    <TableContainer  >
      <Table >
        <TableHead >
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Ticker</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>ExpiryDate</TableCell>
            <TableCell>TradeType</TableCell>
            <TableCell>Premium</TableCell>
            <TableCell>Strike Price</TableCell>
            <TableCell>Profit Loss</TableCell>

         
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(trades) && [...trades].reverse().map(
            ({
              _id,
              userId,
              username,
              premium,
              ticker,
              tradeType,
              strikePrice,
              date,
              expiryDate,
              profitLoss
            }) => (
              <TradeRow
                key={_id}
                tradeId={_id}
                username={username}
                premium={premium}
                ticker={ticker}
                tradeType={tradeType}
                strikePrice={strikePrice}
                date={date}
                expiryDate={expiryDate}
                profitLoss={profitLoss}
              />
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  ) : (
    Array.isArray(trades) && [...trades].reverse().map(
      ({
        _id,
        userId,
        username,
        premium,
        ticker,
        tradeType,
        note,
        date,
        expiryDate
      }) => (
        <TradePost
          key={_id}
          tradeId={_id}
          postUserId={userId}
          premium={premium}
          username={username}
          ticker={ticker}
          tradeType={tradeType}
          note={note}
          date={date}
          expiryDate={expiryDate}
        />
      )
    )
  )}
</>

    );

}

export default TradePosts;
