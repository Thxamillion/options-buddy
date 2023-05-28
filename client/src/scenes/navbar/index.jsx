import { useState } from "react";
import { Box, IconButton, Typography, Select, MenuItem, FormControl, useTheme} from "@mui/material";
import { Message, DarkMode, LightMode, Notifications, Help, Search,PostAdd, Person2 } from "@mui/icons-material";
import Link from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import TradeDialog from "components/TradeDialog";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const dark = theme.palette.background.default;
  const neutralLight = theme.palette.neutral.light;
  const [openTradeDialog, setOpenTradeDialog] = useState(false);

  const handleOpenTradeDialog = () => {
    setOpenTradeDialog(true);
  };

  const handleCloseTradeDialog = () => {
    setOpenTradeDialog(false);
  };

  return (
    <Box
      sx={{
        width: 256,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'center',
        pt: 2,
        backgroundColor: '#1b1c1c',
        minHeight: '100vh',
        position: 'fixed',
        bottom: 0,
      }}
    >
      <Typography
        fontWeight="bold"
        fontSize="clamp(1rem, 2rem, 2.25rem)"
        color="primary"
        onClick={() => navigate("/home")}
        sx={{
          "&:hover": {
            color: "white",
            cursor: "pointer"
          },
        }}
      >
        Options Buddy
      </Typography>
      <FormControl variant="standard" value={user.username} sx={{ my: 2 }}>
        <Select
          value={user.username}
          sx={{
            backgroundColor: neutralLight,
            width: "150px",
            borderRadius: "0.25rem",
            p: "0.25rem 1rem",
            "& .MuiSvgIcon-root": {
              pr: "0.25rem",
              width: "3rem",
            },
            "& .MuiSelect-select:focus": {
              backgroundColor: neutralLight,
            },
          }}
        >
          <MenuItem value={user.username}>
            <Typography>{user.username}</Typography>
          </MenuItem>
          <MenuItem onClick={() => dispatch(setLogout())}> Log Out</MenuItem>
        </Select>
      </FormControl>
      <Box>
      <IconButton onClick={() => navigate("/search")} sx={{ my: 2 }}>
        <Search />
        <Typography>Search</Typography>
      </IconButton>
      </Box>  
      


      <IconButton onClick={handleOpenTradeDialog} sx={{ my: 2 }}>
        <PostAdd />
        <Typography>Add Trade</Typography>
      </IconButton>
      <TradeDialog open={openTradeDialog} handleClose={handleCloseTradeDialog} />
        <IconButton onClick={() => navigate(`/profile/${user.username}`)} sx={{ display: 'flex', alignItems: 'center', my: 2 }}>

            <Person2 sx={{ fontSize: "25px", mr: 1 }} />
            <Typography>Profile</Typography>
        </IconButton>
        
        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
            <Message sx={{ fontSize: "25px", mr: 1 }} />
            <Typography>Messages</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
            <Notifications sx={{ fontSize: "25px", mr: 1 }} />
            <Typography>Notifications</Typography>
        </Box>
        <div style={{ marginTop: "auto" }}>
            <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                <Help sx={{ fontSize: "25px", mr: 1 }} />
                <Typography>Help</Typography>
            </Box>
        </div>

    </Box>
  );
};

export default Navbar;
