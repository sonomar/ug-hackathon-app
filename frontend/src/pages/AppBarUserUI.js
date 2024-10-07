import * as React from "react";
import { useAuth } from "../hooks/useAuth";
import {
    Tooltip, IconButton, Menu, MenuItem, ListItemIcon, Button, Box,
    ListItemButton, ListItemText
} from "@mui/material";
import DonationIcon from "../icon/DonationIcon";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../store/authSlice";
import { NavLink } from "react-router-dom";
import UserIcon from "../icon/UserIcon";

export const UserAppBarIcon = (props) => {
    const auth = useAuth();
    const [anchorLogout, setAnchorLogout] = React.useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        <>
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
                {auth.cred.user &&
                    <>
                        <Button
                            onClick={() => navigate("/receipts")}
                            sx={{ mr: 2 }}
                            endIcon={<DonationIcon />}
                        >My Donation</Button>
                        <Tooltip title={auth.cred.user?.username} >
                            <IconButton sx={{ p: 0 }}
                                size="48px"
                                onClick={handleLogoutMenu}>
                                <UserIcon />
                            </IconButton>
                        </Tooltip >
                    </>
                }
                {!(auth.cred.user) &&
                    <Button
                        LinkComponent={NavLink}
                        to="/login">Login<LoginIcon /></Button>
                }
            </Box>
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
        </>
    )
}

export const UserMobileMenuItems = (props) => {
    const auth = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (event) => {
        dispatch(clearCredentials());
    }

    if (auth.cred.user) return (
        <>
            <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={()=> navigate("/receipts")}
            >
                <ListItemText primary="My Donations"/>
            </ListItemButton>
            <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={handleLogout}
            >
                <ListItemText primary="Logout" />
            </ListItemButton>
        </>
    )
    else return (
        <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => navigate("/login")}
        >
            <ListItemText primary="Login" />
        </ListItemButton>
    )
}