import * as React from "react";
import { Navigate, Outlet} from 'react-router-dom'
import AppBar from "./AppBar";
import { Box, Container } from '@mui/material';
import Footer from "./Footer";

export function AppTemplate() {

    return (
        <Box
            component={"section"}
            sx={{
                width: 1,
                //marginTop: -20,
                display: "static",
                //zIndex: -1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
            }}
        >
            <AppBar />
            <Container
                sx={{
                    flexGrow: 1,
                }}
            >
                <Outlet />
            </Container>
            <Footer/>
        </Box>
    )
}
