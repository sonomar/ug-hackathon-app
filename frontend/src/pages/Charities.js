import * as React from "react";
import { useGetAllCharitiesQuery } from "../api/charityApi";
import { Stack, Card, CardContent, CardHeader, Typography, rgbToHex, Avatar, Box, Grid2, Accordion, 
    AccordionSummary, AccordionDetails, Switch, FormGroup, FormControlLabel, Chip, 
    CardMedia, Link, Button,
    CardActions} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';
import { Masonry } from "@mui/lab";
import { red, blueGrey } from "@mui/material/colors";
import { NavLink } from "react-router-dom";
import AppBar from "./AppBar";

export const Charities = () => {
    const { data, error, isFetching } = useGetAllCharitiesQuery();

    return (
        <Box sx={{ flexGrow: 1 }} margin={1}>
            <Typography variant="h1">
                Charities
            </Typography>
            <Typography variant="body1">
                Explore our list of charitable organizations
                dedicated to making a difference in various communities.
                Each charity works tirelessly to address critical issues 
                like homelessness, hunger, animal rescue,
                and environmental sustainability. 
            </Typography>
            <Grid2 container spacing={2} justifyContent="center"
                sx={{mt: 5}}
            >
                {data?.map((r, index) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <Card
                            variant="outlined"
                            key={index}
                            style={{
                            }}
                        >
                            <CardMedia
                                sx={{height: 305}}
                                image="/img/charity/streun_banner.jpg"
                            />
                            <CardHeader
                                titleTypographyProps={{fontSize: 16}}
                                title={r.name}
                            />
                            <CardContent>
                                <Typography variant="h4">
                                    {r.slogan}
                                </Typography>
                                <Typography variant="body1">
                                    {r.detail}
                                </Typography>
                            </CardContent>
                            <CardActions
                                sx={{display:"flex", flexDirection:"column", mb: 3}}>
                                <Button 
                                    sx={{width: 0.8}}
                                    variant="outlined"
                                    component={NavLink} to={`/charity/${r.id}`}>Visit Charity</Button>
                            </CardActions>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
}