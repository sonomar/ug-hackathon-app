import * as React from "react";

import { useAuth } from "../hooks/useAuth";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { ListItemIcon, ListItemText } from "@mui/material";
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from "react-redux";
import { clearCredentials } from "../store/authSlice";
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material";
import { Drawer, Divider, List, ListItem, ListItemButton } from "@mui/material";
import UserIcon from "../icon/UserIcon";
import { UserAppBarIcon, UserMobileMenuItems } from "./AppBarUserUI";

export const Bar = (props) => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const dispatch = useDispatch();
    const theme = useTheme();


    //    const container = window !== undefined ? () => window().document.body : undefined;

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                UnifyGiving
            </Typography>
            <Divider />
            <List>
                <ListItemButton
                    sx={{ textAlign: "center" }}
                    onClick={() => navigate("/")}
                >
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton
                    sx={{ textAlign: "center" }}
                    onClick={() => navigate("/charities")}
                >
                    <ListItemText primary="Charities" />
                </ListItemButton>
                <Divider />
                <UserMobileMenuItems/>
            </List>
        </Box>
    );

    return (
        <>
            <AppBar
                variant={props.variant}
                elevation={0}
                position="static"
                sx={{
                    width: 0.9,
                    borderRadius: theme.shape.borderRadius,
                    display: "flex",
                    flexGrow: 0,
                    mt: { xs: 5, md: 3 },
                    mb: 5,
                    borderColor: "#D5CDE0",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    py: 1.5,
                }}>
                <Toolbar>
                    <Link component={NavLink} to="/" sx={{
                        display: 'flex',
                        color: 'inherit',
                        textDecoration: 'none',
                        flexGrow: 1,
                    }}>
                        <img
                            height="57"
                            src={props.variant == "home" ? "/img/Logo.png" : "/img/LogoDark.png"}
                        />
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Button
                            component={NavLink}
                            to="/"
                            variant="navbar">Home</Button>
                        <Button
                            component={NavLink}
                            to="/charities"
                            variant="navbar">Charities</Button>
                    </Box>
                    <IconButton
                        sx={{
                            display: {
                                sm: "flex",
                                md: "none"
                            },
                        }}
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon style={{ fontSize: "48px" }} />
                    </IconButton>
                    <UserAppBarIcon />
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={document.body}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { sm: "block", md: "none" },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: .5 },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </>
    );
}

export default Bar;