import { Card, CardContent, Typography, Divider} from '@mui/material';

const ProfileStats = ({ username, wins, losses, openTrades, netPremium, assignedStocks }) => {

    
  return (
    <Card sx={{ 
        border: '0.2px solid white',
        width: 400,
        height: `25vh`,
        ml: 40,
        mt: 3  }} >
      <CardContent>
        <Typography variant="h5">{username}</Typography>
        <Divider />
        <Typography variant="body1">Wins: {wins}</Typography>
        <Typography variant="body1">Losses: {losses}</Typography>
        <Typography variant="body1">Open Trades: {openTrades}</Typography>
        <Typography variant="body1">Net Premium: {netPremium}</Typography>
        <Typography variant="body1">Assigned Stocks: {assignedStocks}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileStats;
