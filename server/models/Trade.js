import mongoose from "mongoose";

const Schema = mongoose.Schema


const TradeSchema = new Schema({
    ticker: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    strikePrice: {
      type: Number,
      required: true
    },
    expiryDate: {
      type: Date,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    entryPrice: {
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