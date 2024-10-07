import * as React from "react";
import { Paper, Button, Box, Grid2, TextField, Stack, Alert } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginMutation } from "../api/userApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "./AppBar";

const schema = yup.object({
    username: yup.string().required().min(3),
    password: yup.string().required(),
}).required();

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [login, { error: loginError, isLoading }] = useLoginMutation();

    const onSubmit = async (data) => {
        try {
            const user = await login(data).unwrap();
            dispatch(setCredentials(user));
            console.log(location.state);
            navigate(location.state?.from? location.state.from.pathname: "/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box sx={{ flexGrow: 1, display: "flex", padding: 2, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>            <Grid2 container spacing={2} alignItems="center" justifyContent="center">
                <Grid2 size={{ xs: 12, sm: 8, md: 6 }} justifyContent="center" alignItems="center">
                    <img src="/img/monitoring.svg" className="centerImage" />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 8, md: 6 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
                            <TextField label="Username"
                                disabled={isLoading}
                                {...register("username")}
                                error={errors?.username}
                                helperText={errors.username?.message}
                                required
                            />
                            <TextField label="Password"
                                disabled={isLoading}
                                {...register("password")}
                                type="password"
                                required
                            />
                            {loginError && <Alert severity="error">{loginError?.data.message}</Alert>}
                            <LoadingButton type="submit"
                                loading={isLoading} loadingPosition="end" variant="contained"
                                endIcon={<LoginIcon />}>
                                Login
                            </LoadingButton>
                        </Stack>
                    </form>
                </Grid2>
            </Grid2>
        </Box>
    );
}