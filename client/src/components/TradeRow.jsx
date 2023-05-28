import { useNavigate } from "react-router-dom";
import { TableRow, TableCell } from "@mui/material";

const TradeRow = ({ username, tradeId, ...props }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${username}/${tradeId}`);
  };

  return (
    <TableRow
  hover
  onClick={handleClick}
  
>
      <TableCell>{username}</TableCell>
      <TableCell>{props.ticker}</TableCell>
      <TableCell>{new Date(props.date).toLocaleDateString()}</TableCell>
      <TableCell>{new Date(props.expiryDate).toLocaleDateString()}</TableCell>
      <TableCell>{props.tradeType}</TableCell>
      <TableCell>{props.premium}</TableCell>
      <TableCell>{props.strikePrice}</TableCell>
      <TableCell>{props.profitLoss}</TableCell>
      
    </TableRow>
  );
};



export default TradeRow;