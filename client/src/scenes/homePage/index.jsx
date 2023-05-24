import { Box } from "@mui/material"
import { useSelector } from "react-redux"
import Navbar from "scenes/navbar"

const HomePage = () => {

    const { _id } = useSelector((state) => state.user);
    return <Box>
        <Navbar />
    </Box>
}

export default HomePage 