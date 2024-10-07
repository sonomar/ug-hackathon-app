import * as React from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from '../hooks/useAuth'
import { useDonateMutation } from "../api/donateApi";
import * as yup from "yup";
import {
    TextField, Box,
    InputAdornment, Typography, Card, CardHeader, CardContent,
    CardActions, Button
} from "@mui/material";

const schema = yup.object({
    donateeId: yup.string().required(),
    amount: yup.number().required().min(10),
    datetime: yup.date().default(new Date()),
    username: yup.string().required(),
}).required();

export const Donate = () => {
    const auth = useAuth();
    const { id: donateeId } = useParams();
    const [donate, {isLoading}] = useDonateMutation();

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
                            <Button type="submit">Make Donation!</Button>
                        </CardActions>
                    </Card>
                </form>
            </Box>
        </>
    );
}