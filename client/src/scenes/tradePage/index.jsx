import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import Navbar from 'scenes/navbar';
import TradePost from 'components/TradePost';
import CloseEdit from 'components/CloseEdit';

const TradePage = () => {
  const [trade, setTrade] = useState(null);
  const [closeEditOpen, setCloseEditOpen] = useState(false);
  const [closeEditAction, setCloseEditAction] = useState('');
  const { username, tradeId } = useParams(); 
  const token = useSelector((state) => state.token);

  const handleOpenCloseEdit = (action) => {
    setCloseEditOpen(true);
    setCloseEditAction(action);
  };

  const handleCloseCloseEdit = () => {
    setCloseEditOpen(false);
  };
  
  useEffect(() => {
    const fetchTrade = async () => {
      const response = await fetch(`http://localhost:3001/trades/${username}/${tradeId}`, {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`},
      });
      const data = await response.json();
      console.log(data)
      setTrade(data);
    };
    fetchTrade();
  }, [tradeId, token]);

  if (!trade) return 'Loading...';

  return (
    
    <Box >
        <Navbar />
        <TradePost
          key={trade._id}
          tradeId={trade._id}
          postUserId={trade.userId}
          premium={trade.premium}
          username={username}
          ticker={trade.ticker}
          tradeType={trade.tradeType}
          note={trade.note}
          date={trade.date}
          expiryDate={trade.expiryDate}
          profitLoss={trade.profitLoss} 
          />
          <Box sx={{display: 'flex', ml: '256px'}}>
          <Button variant="contained" onClick={() => handleOpenCloseEdit('close')}>Close Trade</Button>
          <Button variant="contained" color="secondary" onClick={() => handleOpenCloseEdit('edit')}>Edit Trade</Button>
        </Box>
        <CloseEdit 
          open={closeEditOpen} 
          handleClose={handleCloseCloseEdit} 
          action={closeEditAction} 
          trade={trade} 
        />
    </Box>
  );
};

export default TradePage;
