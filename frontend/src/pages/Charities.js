import * as React from "react";
import { useGetAllCharitiesQuery } from "../api/charityApi";
import { Stack, Card, CardContent, CardHeader, Typography, rgbToHex, Avatar, Box, Grid2, Accordion, 
    AccordionSummary, AccordionDetails, Switch, FormGroup, FormControlLabel, Chip, 
    CardMedia, Link,
    CardActions} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';
import { Masonry } from "@mui/lab";
import { red, blueGrey } from "@mui/material/colors";
import { NavLink } from "react-router-dom";

export const Charities = () => {
    const { data, error, isFetching } = useGetAllCharitiesQuery();

    return (
        <Box sx={{ flexGrow: 1 }} margin={1}>
            charities
            <Grid2 container spacing={2} justifyContent="center">
                {data?.map((r, index) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <Card
                            key={index}
                            style={{
                                backgroundColor: blueGrey[100 + (index % 4) * 100],
                            }}
                        >
                            <CardMedia
                                sx={{height: 140}}
                                image="/img/charity/streun_banner.jpg"
                            />
                            <CardHeader
                                avatar={
                                    <Avatar src="/img/charity/streun_logo.png" alt={r.name}/>
                                }
                                title={r.name}
                                subheader={r.city + ", " + r.country}
                            />
                            <CardActions>
                                <Link component={NavLink} to={`/charity/${r.id}`}>Detail</Link>
                            </CardActions>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
}