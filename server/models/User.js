import mongoose from "mongoose";

const Schema = mongoose.Schema
const UserSchema = new Schema(
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
        date: {
            type: Date,
            default: Date.now
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
        trades: [{
            type: Schema.Types.ObjectId,
            ref: 'Trade'
          }],
          following: [{    // users that this user is following
            type: Schema.Types.ObjectId,
            ref: 'User'
          }],
          followers: [{    // users that are following this user
            type: Schema.Types.ObjectId,
            ref: 'User'
          }]
    });

const User = mongoose.model("User", UserSchema)
export default User;