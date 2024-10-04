import * as React from "react";
import { Routes, Route } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Login } from './pages/Login';
import { Receipts } from './pages/Receipts';
import { BrowserRouter } from 'react-router-dom'
import { PrivateOutlet } from "./utils/PrivateOutlet";
import { Charities } from "./pages/Charities";
import {Donate} from "./pages/Donate";
import { Donatees } from "./pages/Donatees";
import { Box, CssBaseline } from '@mui/material';
import AppBar from "./pages/AppBar";

import logo from './logo.svg';
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ height: "100%" }}>
        <BrowserRouter>
          <AppBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/charities" element={<Charities />} />
            <Route path="/charity/:id" element={<Donatees />} />
            <Route path="*" element={<PrivateOutlet />}>
              <Route index element={<Receipts />} />
              <Route path="receipts" element={<Receipts />} />
              <Route path="donate/:id" element={<Donate/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
