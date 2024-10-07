import * as React from "react";
import { useGetAllCountriesQuery, useGetAllReceiptsQuery } from "../api/receiptApi";
import { Stack, Card, CardContent, CardHeader, Typography, rgbToHex, Avatar, Box, Grid2, Accordion, 
    AccordionSummary, AccordionDetails, Switch, FormGroup, FormControlLabel, Chip, 
    CardActionArea, Button, Link,
    CardActions} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';
import { Masonry } from "@mui/lab";
import { red, blueGrey } from "@mui/material/colors";
import { NavLink } from "react-router-dom";

export const Receipts = () => {
    const { data, error, isFetching } = useGetAllReceiptsQuery();

    /*
    const {data: countriesData } = useGetAllCountriesQuery();
    const [countries, setCountries] = React.useState([]);

    React.useEffect(()=>{
        setCountries(
            countriesData?.map((c)=> {
                return{
                    country: c,
                    checked: true,
            }})
        );
    }, [countriesData]);

    function handleCountryChange(c){
        c.checked = !c.checked;
        setCountries([...new Set(countries)]);
    }
*/
    return (
        <Box sx={{ flexGrow: 1 }} margin={1}>
            {/*
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    Filter
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup sx={{flexDirection: "row"}}>
                    {countries?.map((c, index)=>{
                        return (
                            <FormControlLabel key={index} control={<Switch/>} label={c.country} checked={c.checked} onChange={(e)=>{handleCountryChange(c);}} />
                    )})}
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            */}
            <Grid2 container spacing={2} justifyContent="center">
                {data?.map((r, index) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <Card
                            variant="receipt"
                            key={index}
                            style={{
                                backgroundColor: blueGrey[100 + (index % 4) * 100],
                            }}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar sx={(theme)=>{
                                        return {backgroundColor: theme.palette.primary.main}
                                    }}>
                                        {r.recipient[0]}
                                    </Avatar>
                                }
                                title={r.recipient}
                                subheader={r.city + ", " + r.country}
                                
                            />
                            <CardContent>
                                <Typography gutterBottom>Date: {new Date(r.date).toLocaleDateString()} </Typography>
                                <Typography gutterBottom>Amount: {r.currency} {r.amount} </Typography>
                            </CardContent>
                            <CardActionArea
                                sx={{mb: 2}}
                            >
                                <CardActions>
                                    <Link component={NavLink}
                                        target="nft"
                                        to={`https://solscan.io/token/${r.nft}`}
                                    >
                                        View NFT
                                    </Link>
                                    <Link>
                                        Download
                                    </Link>
                                </CardActions>
                            </CardActionArea>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
}