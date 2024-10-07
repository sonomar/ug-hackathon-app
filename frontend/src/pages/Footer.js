import * as React from "react";
import { Box, Typography, Link, Divider } from "@mui/material";


export default function Footer() {
    return (
        <Box component="footer"
            sx={{
                backgroundColor: "#0c0033",
                width: 1,
                padding: 4,
                mt: 2,
            }}
        >
            <Box
                sx={{
                    width: .95,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <Box
                    sx={{ display: "flex", flexDirection: "row", mb: 4}}>
                    <img src="/img/Logo.png" />
                </Box>
                <Typography variant="body1" color="white">
                    Contact us:
                </Typography>
                <Typography variant="body1" color="white">
                    Email: <Link sx={{color:"white"}} href="mailto:contact@unifygiving.com">contact@unifygiving.com</Link>
                </Typography>
                <Typography variant="body1" color="white">
                    Address: London, United Kingdom
                </Typography>
                <Divider sx={{borderColor: "white"}}/>
                <Typography variant="body1" color="white">
                    © 2024 Unifygiving. All Rights Reserved.
                </Typography>
            </Box>
        </Box>
    );
}