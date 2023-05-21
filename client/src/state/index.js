import {createSlice} from "@reduxjs/toolkit";

const initialState = {
     mode: "light",
     user: null,
     token: null,
     trades: [],

};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"
        },
        setLogin: (state,action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setTrades: (state,action) => {
            state.trades = action.payload.posts;
        },
        setPost: (state,action) => {
            const updatedTrades = state.trades.map((trade) => {
                if(trade._id === action.payload.trade_id) return action.payload.trade;
                return trade;
            });
            state.trades = updatedTrades;
        }
    },

})

export const {setMode, setLogin, setLogout, setPosts,setPost} = authSlice.actions;

export default authSlice.reducer;