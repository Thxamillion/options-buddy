import mongoose from "mongoose";




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
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    profitLoss: {
      type: Number,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  });
  

  module.exports = Trade = mongoose.model('Trade', TradeSchema);