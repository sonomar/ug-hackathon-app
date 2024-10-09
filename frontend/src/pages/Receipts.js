import * as React from "react";
import { useGetAllReceiptsGroupByDateQuery, useGetAllReceiptsQuery } from "../api/receiptApi";
import {
    Stack, Card, CardContent, CardHeader, Typography, rgbToHex, Avatar, Box, Grid2, Accordion,
    AccordionSummary, AccordionDetails, Switch, FormGroup, FormControlLabel, Chip,
    CardActionArea, Button, Link,
    CardActions, Skeleton
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';
import { Masonry } from "@mui/lab";
import OneTimeDonationIcon from "../icon/OneTimeDonationIcon";
import { red, blueGrey } from "@mui/material/colors";
import { NavLink } from "react-router-dom";

export const Receipts = () => {
    const { data, error, isFetching } = useGetAllReceiptsGroupByDateQuery();

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
        <>
            <Typography variant="h1" sx={{ textAlign: "left" }}>
                My Donation
            </Typography>
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
                {isFetching &&
                    <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                        <Skeleton
                            variant="line" sx={{width:.3}}
                        />
                        <Skeleton
                            variant="line" sx={{width:.5}}
                        />
                        <Skeleton
                            variant="line" sx={{width:.4}}
                        />
                    </Box>
                }
                {data?.map((dateGroup, index) => (
                    <>
                        <Typography variant="h6">
                            {new Date(dateGroup[0].date).toLocaleDateString()}
                        </Typography>
                        <Grid2 sx={{ my: 4 }} container spacing={2} justifyContent="flex-start">
                            {dateGroup?.map((r, index) => (
                                <Grid2 size={{ xs: 12, sm: 12, md: 6 }} key={index}>
                                    <Card
                                        key={index}
                                    >
                                        <CardContent sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "flex-start",
                                            gap: 2,
                                        }}>
                                            <OneTimeDonationIcon />
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Typography sx={{ fontSize: 20, fontWeight: 700 }}>{r.donatee}</Typography>
                                                <Typography>One time Donation</Typography>
                                            </Box>
                                            <Box>
                                                <Typography>{r.currency?r.currency: "€"} {r.amount}</Typography>
                                                <Typography></Typography>
                                            </Box>
                                        </CardContent>
                                        <CardActionArea
                                            sx={{ mb: 2 }}
                                        >
                                            <CardActions sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                gap: 2,
                                                alignSelf: "stretch",
                                            }}>
                                                <Button sx={{ width: .9 }}
                                                    variant="outlined" component={NavLink}
                                                    target="nft"
                                                    to={`https://explorer.solana.com/address/${r.signature}?cluster=devnet#metadata`}
                                                >
                                                    View NFT
                                                </Button>
                                            </CardActions>
                                        </CardActionArea>
                                    </Card>
                                </Grid2>
                            ))}
                        </Grid2>
                    </>
                ))}
            </Box>
        </>
    );
}
