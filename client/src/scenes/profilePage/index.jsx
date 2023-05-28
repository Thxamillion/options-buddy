import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import Navbar from "scenes/navbar";
import { Box } from "@mui/material";

import { useSelector } from "react-redux";
import TradePosts from "components/TradePosts";
import ProfileStats from "components/ProfileStats";



const ProfilePage = () => {
    const { username } = useParams(); // from 'react-router-dom'
    const {_id} = useSelector((state) => state.user)
    const [user, setUser] = useState(null);
    const token = useSelector((state) => state.token);

    const wins = 10;
    const losses = 2;
    const openTrades = 3;
    const netPremium = 1000;
    const assignedStocks = 5;


    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${username}`,{
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
        },[]);

        if(!user) return null;


        return (
            <Box>
            <Navbar /> 
            <ProfileStats 
                username={username} 
                wins={wins} 
                losses={losses} 
                openTrades={openTrades} 
                netPremium={netPremium} 
                assignedStocks={assignedStocks} 
            />
            <TradePosts userId={_id} isProfile={true} />
            </Box>

        )

        }

export default ProfilePage 