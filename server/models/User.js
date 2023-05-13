import mongoose from "mongoose";


const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 3,
            max:20,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            max:50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min:5,
        },
        picturePath: {
            type: String,
            default: "",
        },
        trades: {
            type: Array,
            default: []
        }
    })