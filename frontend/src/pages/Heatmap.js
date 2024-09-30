import * as React from "react";
import { useGetAllReceiptsQuery } from "../api/receiptApi";
import { Stack, Card, CardContent, CardHeader, Typography, rgbToHex, Avatar } from "@mui/material";
import { Masonry } from "@mui/lab";
import { red, blueGrey } from "@mui/material/colors";
import Map from "react-map-gl";

export const Heatmap = () => {
    const { data, error, isFetching } = useGetAllReceiptsQuery();

    return (
        <Map
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
            initialViewState={{
                longitude: -122.4,
                latitude: 37.8,
                zoom: 14
            }}
            style={{ width: 600, height: 400 }}
            mapStyle="mapbox://styles/gueei/cm1kmlhj400gr01qt5z9810jb"
        />
    );
}