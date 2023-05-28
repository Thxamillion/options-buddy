import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrades } from "state";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

const CloseEdit = ({ open, handleClose, action, trade }) => {


    
  const [closedPrice, setClosedPrice] = useState("");
  const [tradeType, setTradeType] = useState("");
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState("");
  const [strikePrice, setStrikePrice] = useState("");
  const [premium, setPremium] = useState("");
  const [expiryDate, setExpiryDate] = useState(null);
  const [isAssigned, setIsAssigned] = useState(false);
  const [note, setNote] = useState("");
  const dispatch = useDispatch();
  const { _id,username } = useSelector((state) => state.user);

  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (trade) {
      setTradeType(trade.tradeType);
      setTicker(trade.ticker);
      setQuantity(trade.quantity);
      setStrikePrice(trade.strikePrice);
      setPremium(trade.premium);
      setExpiryDate(trade.expiryDate);
      setIsAssigned(trade.isAssigned);
      setNote(trade.note);
    }
  }, [trade]);

  const handleSubmit = async () => {
    let updatedTrade;

    if (action === 'close') {
    const profitLoss = !isAssigned ?  premium - closedPrice : premium;
      updatedTrade = { ...trade, closedPrice, profitLoss };
    } else if (action === 'edit') {
      updatedTrade = {
        tradeType,
        ticker,
        quantity,
        strikePrice,
        premium,
        expiryDate,
        isAssigned,
        note,
        userId: _id,
        username
      };
    }
  console.log(updatedTrade)
    const response = await fetch(`http://localhost:3001/trades/${username}/${trade._id}`, { 
      method: "PUT",
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedTrade),
    });

    const trades = await response.json();
    dispatch(setTrades({ trades }));

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{action === 'close' ? 'Close Trade' : 'Edit Trade'}</DialogTitle>
      <DialogContent>
        {action === 'close' && (
        <FormControl>
          <TextField
            autoFocus
            margin="dense"
            label="Closed Price"
            type="text"
            fullWidth
            variant="standard"
            value={closedPrice}
            onChange={(e) => setClosedPrice(e.target.value)}
          />
          <FormControlLabel
              control={
                <Checkbox
                  checked={isAssigned}
                  onChange={(e) => setIsAssigned(e.target.checked)}
                  name="isAssigned"
                />
              }
              label="Assigned"
            />
            </FormControl>
          
        )}
        {action === 'edit' && (
          <>
            <FormControl fullWidth>
              <InputLabel id="trade-type-label">Trade</InputLabel>
              <Select
                labelId="trade-type-label"
                value={tradeType}
                onChange={(e) => setTradeType(e.target.value)}
              >
                <MenuItem value={"Covered Call"}>Covered Call</MenuItem>
                <MenuItem value={"Cash Secured Put"}>Cash Secured Put</MenuItem>
              </Select>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              label="Ticker"
              type="text"
              fullWidth
              variant="standard"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Expiry Date"
                  value={dayjs(expiryDate)}
                  onChange={(newDate) => setExpiryDate(newDate)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              margin="dense"
              label="Quantity"
              type="text"
              fullWidth
              variant="standard"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            
            <TextField
              margin="dense"
              label="Strike Price"
              type="text"
              fullWidth
              variant="standard"
              value={strikePrice}
              onChange={(e) => setStrikePrice(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Premium Earned"
              type="text"
              fullWidth
              variant="standard"
              value={premium}
              onChange={(e) => setPremium(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAssigned}
                  onChange={(e) => setIsAssigned(e.target.checked)}
                  name="isAssigned"
                />
              }
              label="Assigned"
            />
            <TextField
              margin="dense"
              label="Note"
              type="text"
              fullWidth
              variant="standard"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>{action === 'close' ? 'Close' : 'Edit'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CloseEdit;
