import * as React from "react";
import { useGetAllCountriesQuery, useGetAllReceiptsQuery } from "../api/receiptApi";
import { Stack, Card, CardContent, CardHeader, Typography, rgbToHex, Avatar, Box, Grid2, Accordion, 
    AccordionSummary, AccordionDetails, Switch, FormGroup, FormControlLabel, Chip } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';
import { Masonry } from "@mui/lab";
import { red, blueGrey } from "@mui/material/colors";

export const Receipts = () => {
    const { data, error, isFetching } = useGetAllReceiptsQuery();

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

    return (
        <Box sx={{ flexGrow: 1 }} margin={1}>
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
            <Grid2 container spacing={2} justifyContent="center">
                {data?.receipts.map((r, index) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <Card
                            key={index}
                            className="zigzag"
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
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
}