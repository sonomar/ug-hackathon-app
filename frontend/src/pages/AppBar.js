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
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useDispatch } from "react-redux";
import { clearCredentials } from "../store/authSlice";
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material";
import {Drawer, Divider, List, ListItem, ListItemButton} from "@mui/material";
import UserIcon from "../icon/UserIcon";
import DonationIcon from "../icon/DonationIcon";
import {color} from "../styles/theme";

export const Bar = (props) => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [anchorLogout, setAnchorLogout] = React.useState(null);
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const dispatch = useDispatch();
    const theme = useTheme();

    const handleLogoutMenu = (event) => {
        setAnchorLogout(event.currentTarget);
    }

    const handleCloseLogoutMenu = () => {
        setAnchorLogout(null);
    }

    const handleLogout = (event) => {
        dispatch(clearCredentials());
        setAnchorLogout(null);
    }
    
//    const container = window !== undefined ? () => window().document.body : undefined;
    
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                UnifyGiving
            </Typography>
            <Divider />
            <List>
                <ListItemButton
                    sx={{textAlign:"center"}}
                    onClick={() => navigate("/receipts")}
                >
                    <ListItemText primary="Receipts"/>
                </ListItemButton>
                <ListItemButton
                    sx={{textAlign:"center"}}
                    onClick={() => navigate("/charities")}
                >
                    <ListItemText primary="Charities"/>
                </ListItemButton>
                <Divider />
                <ListItemButton
                    sx={{textAlign:"center"}}
                    onClick={() => navigate("/login")}
                >
                    <ListItemText primary="Login"/>
                </ListItemButton>
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
                    mt: {xs: 5, md: 3},
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
                            src={props.variant=="home"? "/img/Logo.svg" : "/img/LogoDark.svg"}
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
                    <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
                        <Button
                            onClick={() => navigate("/receipts")}
                            sx={{ mr: 2}}
                            endIcon={<DonationIcon/>}
                            >My Donation</Button>

                        <Tooltip title={auth.cred.user?.username}>
                            <IconButton sx={{ p: 0 }}
                                size="48px"
                                onClick={handleLogoutMenu}>
                                <UserIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            anchorEl={anchorLogout}
                            open={Boolean(anchorLogout)}
                            onClose={handleCloseLogoutMenu}
                        >
                            <MenuItem onClick={null} >
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                Settings</MenuItem>
                            <MenuItem onClick={handleLogout} >
                                <ListItemIcon>
                                    <LogoutIcon/>
                                </ListItemIcon>
                                Logout</MenuItem>
                        </Menu>
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
                            <MenuIcon style={{fontSize: "48px"}}/>
                    </IconButton>
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
                        display: {sm: "block", md: "none"},
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