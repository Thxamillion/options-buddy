import Trade from "../models/Trade.js";
import User from "../models/User.js";

//create
export const createTrade = async(req, res) => {

    try {

        const trade = req.body;
        const user = await User.findById(trade.userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add username to the trade
        trade.username = user.username;

        
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
        res.status(404).json({ message: error.message });
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


//update

