import * as React from "react";
import { useGetCharityByIdQuery } from "../api/charityApi";
import {
    Stack, Card, CardContent, CardHeader, Typography, rgbToHex, Avatar, Box, Grid2, Accordion,
    AccordionSummary, AccordionDetails, Switch, FormGroup, FormControlLabel, Chip, Button,
    CardMedia, Link, Modal, Breadcrumbs,
    CardActions, Container, Divider
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
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Link
                    sx={{ fontWeight: 600 }}
                    component={NavLink} to="/charities">&lt; Back to Charities</Link>
                <Box component="span" sx={{ mx: 1 }}>|</Box>
                <Breadcrumbs separator=">">
                    <Link component={NavLink} to="/">Home</Link>
                    <Link component={NavLink} to="/charities">Charities</Link>
                    <Typography>{data?.name}</Typography>
                </Breadcrumbs>
            </Box>
            <Typography variant="h1" sx={{ textAlign: "left" }}>
                {data?.name}
            </Typography>
            <Typography variant="body1">
                {data?.detail}
            </Typography>
            <Typography variant="h2">
                Recipients
            </Typography>
            <Grid2
                container spacing={2} justifyContent="center">
                {data?.donatees.map((r, index) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <Card
                            key={index}
                            elevation={0}
                        >
                            <CardMedia
                                sx={{ height: 232 }}
                                image={`/img/donatee/${r.id}.png`}
                            />
                            <CardHeader
                                titleTypographyProps={{ fontSize: "28px", fontWeight: 500 }}
                                title={r.name}
                            />
                            <CardContent>
                                <Divider />
                                <Typography>
                                    Sex: {r.sex}
                                </Typography>
                                <Typography>
                                    Age: {r.age} years
                                </Typography>
                                <Typography>
                                    Official injections: {r.injections ? "Yes" : "No"}
                                </Typography>
                                <Typography>
                                    Neutered: {r.neutered ? "Yes" : "No"}
                                </Typography>
                                <Divider />
                                <Typography sx={{ mt: 2 }}>
                                    {r.personality}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ display: "flex", flexDirection: "column", mb: 3 }}>
                                <Button sx={{ width: 0.8 }} disabled
                                    variant="outlined" href={`/donate/${r.id}`}>Donate(coming soon)</Button>
                            </CardActions>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
}
