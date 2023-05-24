// TradeDialog.js
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";

const TradeDialog = ({ open, handleClose }) => {
  const [tradeType, setTradeType] = useState("");
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [strikePrice, setStrikePrice] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [isAssigned, setIsAssigned] = useState(false);
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    // TODO: You might want to do something with these trade details here
    console.log({tradeType, symbol, quantity, strikePrice, entryPrice, isAssigned, notes});
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Trade</DialogTitle>
      <DialogContent>
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
          label="Symbol"
          type="text"
          fullWidth
          variant="standard"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
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
          label="Entry Price"
          type="text"
          fullWidth
          variant="standard"
          value={entryPrice}
          onChange={(e) => setEntryPrice(e.target.value)}
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
          label="Notes"
          type="text"
          fullWidth
          variant="standard"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TradeDialog;
