import * as React from "react";
import { useGetCharityByIdQuery } from "../api/charityApi";
import {
    Stack, Card, CardContent, CardHeader, Typography, rgbToHex, Avatar, Box, Grid2, Accordion,
    AccordionSummary, AccordionDetails, Switch, FormGroup, FormControlLabel, Chip, Button,
    CardMedia, Link, Modal,
    CardActions
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';
import { Masonry } from "@mui/lab";
import { red, blueGrey } from "@mui/material/colors";
import { NavLink, useParams } from "react-router-dom";

export const Donatees = () => {
    const { id: charityId } = useParams();
    const { data, error, isFetching } = useGetCharityByIdQuery(charityId);

    return (
        <Box sx={{ flexGrow: 1 }} margin={1}>
            {charityId}
            <Grid2 container spacing={2} justifyContent="center">
                {data?.donatees.map((r, index) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <Card
                            key={index}
                            style={{
                                backgroundColor: blueGrey[100 + (index % 4) * 100],
                            }}
                        >
                            <CardMedia
                                sx={{ height: 100 }}
                                image={`/img/donatee/${r.id}.jpg`}
                            />
                            <CardHeader
                                avatar={
                                    <Avatar src="/img/charity/streun_logo.png" alt={r.name} />
                                }
                                title={r.name}
                            />
                            <CardActions>
                                <Button href={`/donate/${r.id}`}>Donate Now</Button>
                            </CardActions>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
}