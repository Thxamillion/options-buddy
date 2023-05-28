
import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';
import TradePage from 'scenes/tradePage';
import {useMemo} from "react";
import {useSelector} from "react-redux";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {themeSettings} from "./theme";
import SearchPage from 'scenes/searchPage';


function App() {
  const mode = useSelector((state)=> state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)),[mode] );
  const isAuth = Boolean(useSelector((state) => state.token))
  const username = useSelector(state => state.user.username);

  return <div className="app">  
  <BrowserRouter>
  <ThemeProvider theme ={theme}>
    <CssBaseline/>
    <Routes>
      <Route 
      path="/" 
      element={<LoginPage />} 
      />
      <Route 
      path="/home" 
      element={isAuth ? <HomePage /> : <Navigate to="/" 
      />} />
      <Route 
      path="/search" 
      element={ <SearchPage 
      />} />
      <Route 
      path="/profile/:username" 
      element={isAuth ? <ProfilePage /> : <Navigate to="/" 
      />} />
      <Route 
      path="/:username/:tradeId" 
      element={isAuth ? <TradePage /> : <Navigate to="/" 
      />} />
    </Routes>
    </ThemeProvider>
  </BrowserRouter>
  </div>
}

export default App;
