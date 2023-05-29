import Trade from "../models/Trade.js";
import User from "../models/User.js";

//create
export const createTrade = async(req, res) => {
    console.log(req.body)
    try {
        const trade = req.body;
        const user = await User.findById(trade.userId);
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        
        
        const newTrade = new Trade(trade);
        await newTrade.save();

        // updates feed of all user trades
        const trades = await Trade.find();
        res.status(201).json(trades);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


// read

export const getFeedTrades = async (req, res) => {


    try{
        const trades = await Trade.find();
        res.status(200).json(trades);
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserTrades = async( req, res) => {
    try{
        const {userId} = req.params; 
        const trades = await Trade.find({userId});
        res.status(200).json(trades);
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
}

export const getTradeById = async (req, res) => {
    const { tradeId } = req.params;
    
    try {
      const trade = await Trade.findById(tradeId);
      
      if (!trade) {
        return res.status(404).json({ message: "Trade not found" });
      }
  
      res.json(trade);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const editTrade = async (req, res) => {
    const { tradeId } = req.params;
    const { tradeType, ticker, quantity, strikePrice, premium, expiryDate, isAssigned, note,closedDate, profitLoss } = req.body;
    
    try {
        // Find trade by id
        const trade = await Trade.findById(tradeId);
        
        // Check if trade exists
        if (!trade) {
            return res.status(404).send({ message: 'Trade not found' });
        }
        
        // Update fields
        trade.tradeType = tradeType;
        trade.ticker = ticker;
        trade.quantity = quantity;
        trade.strikePrice = strikePrice;
        trade.premium = premium;
        trade.expiryDate = expiryDate;
        trade.isAssigned = isAssigned;
        trade.note = note;
        trade.closedDate = closedDate;
        trade.profitLoss = profitLoss;

        // Save updated trade
        await trade.save();

        res.status(200).send(trade);
    } catch (err) {
        res.status(500).send(err);
    }
};

  


//update

