import * as React from "react";
import { Routes, Route } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Login } from './pages/Login';
import { Receipts } from './pages/Receipts';
import { BrowserRouter } from 'react-router-dom'
import { PrivateOutlet } from "./utils/PrivateOutlet";
import { Charities } from "./pages/Charities";
import { Donate } from "./pages/Donate";
import { Donatees } from "./pages/Donatees";
import { Box, CssBaseline, Container } from '@mui/material';
import { Home } from "./pages/Home";
import { AppTemplate } from "./pages/AppTemplate";
import AppBar from "./pages/AppBar";

import { themeOptions } from "./styles/theme";
import './App.css';

const darkTheme = createTheme(themeOptions);

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box id="" sx={{
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
      }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<AppTemplate />}>
              <Route path="login" element={<Login />} />
              <Route path="charities" element={<Charities />} />
              <Route path="charity/:id" element={<Donatees />} />
              <Route path="*" element={<PrivateOutlet />}>
                <Route path="receipts" element={<Receipts />} />
                <Route path="donate/:id" element={<Donate />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
