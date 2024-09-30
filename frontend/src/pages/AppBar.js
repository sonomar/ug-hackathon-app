import * as React from "react";

import { useAuth } from "../hooks/useAuth";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { ListItemIcon } from "@mui/material";
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

export default () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [anchorLogout, setAnchorLogout] = React.useState(null);
    const dispatch = useDispatch();

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

    return (
        <AppBar position="sticky" sx={{ height: "64px" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Link component={NavLink} to="/" sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                color: 'inherit',
                                textDecoration: 'none',
                            }}>
                        <Typography
                            variant="h6"
                            noWrap
                            href="#app-bar-with-responsive-menu"
                            
                        >UnifyGiving</Typography>
                        </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
                        <Button
                            onClick={() => navigate("/receipts")}
                            sx={{ my: 2, color: 'white', display: 'block' }}>Receipts</Button>
                        <Button
                            onClick={() => navigate("/heatmap")}
                            sx={{ my: 2, color: 'white', display: 'block' }}>Heatmap</Button>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={auth.cred.user?.username}>
                            <IconButton sx={{ p: 0 }}
                                size="large"
                                onClick={handleLogoutMenu}>
                                <AccountCircle />
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
                                    <LogoutIcon />
                                </ListItemIcon>
                                Logout</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}