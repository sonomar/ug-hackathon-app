import * as React from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from '../hooks/useAuth'
import { useDonateMutation } from "../api/donateApi";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { NavLink } from "react-router-dom";

import * as yup from "yup";
import {
    TextField, Box,
    InputAdornment, Typography, Card, CardHeader, CardContent,
    CardActions, Button
} from "@mui/material";

const schema = yup.object({
    donateeId: yup.string().required(),
    amount: yup.number().required().min(10),
    username: yup.string().required(),
}).required();

export const Donate = () => {
    const auth = useAuth();
    const { id: donateeId } = useParams();
    const [donate, { data, isLoading, isSuccess, isError, reset }] = useDonateMutation();
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (isSuccess) setOpen(true);
    }, [isSuccess, isError])

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        values: {
            donateeId,
            username: auth.cred.user.username,
        }
    });

    const onSubmit = (data) => {
        donate(data);
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, display: "flex", padding: 2, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader title="Donate To" />
                        <CardContent>
                            <TextField label="Amount"
                                disabled={isLoading}
                                {...register("amount")}
                                error={errors?.amount != null}
                                helperText={errors?.amount?.message}
                                required
                                slotProps={{
                                    input: {
                                        startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                    },
                                }}
                            />
                        </CardContent>
                        <CardActions>
                            <LoadingButton
                                loading={isLoading}
                                type="submit">Make Donation!</LoadingButton>
                        </CardActions>
                    </Card>
                </form>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>Donation Made</DialogTitle>
                <DialogContentText sx={{padding: 2}}>
                    <Link component={NavLink} to={`https://explorer.solana.com/address/${data?.signature}?cluster=devnet`} target="nft">
                        Click to view your NFT Receipt here.
                    </Link>
                </DialogContentText>
                <DialogActions>
                    <Button onClick={handleClose}>Cool!</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}