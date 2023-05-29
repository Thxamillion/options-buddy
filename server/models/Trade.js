import mongoose from "mongoose";

const Schema = mongoose.Schema


const TradeSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    ticker: {
      type: String,
      required: true
    },
    tradeType: {
      type: String,
      required: true
    },
    strikePrice: {
      type: Number,
      required: true
    },
    priceClosed: {
      type: Number,
    },
    expiryDate: {
      type: Date,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    premium: {
      type: Number,
      required: true
    },
    exitPrice: {
      type: Number
    },
    date: {
      type: Date,
      default: Date.now
    },
    profitLoss: {
      type: Number
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    note: {
         type: String 
        }
  });
  

  const Trade = mongoose.model("Trade", TradeSchema)
  export default Trade;