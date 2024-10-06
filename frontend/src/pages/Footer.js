import * as React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box component="footer"
            sx={{
                backgroundColor: "#0c0033",
                width: 1,
            }}
        >
            <Box
                sx={{
                    width: .95,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography variant="p" color="white">
                    © 2024 Unifygiving. All Rights Reserved.
                </Typography>
            </Box>
        </Box>
    );
}