import { Box } from "@mui/material"
import TradePosts from "components/TradePosts"
import { useSelector } from "react-redux"
import Navbar from "scenes/navbar"

const HomePage = () => {

    const { _id } = useSelector((state) => state.user);
    return <Box>
        <Navbar />


        <TradePosts userId={_id}/>
    </Box>
}

export default HomePage 