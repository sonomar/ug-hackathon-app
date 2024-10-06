import * as React from "react";
import {
    Box, Button, Typography, Container, Link,
    Card, CardHeader, CardMedia, CardContent,
    CardActionArea,
    IconButton,
} from "@mui/material";
import AppBar from "./AppBar";
import { color } from "../styles/theme";
import Footer from "./Footer";
import Carousel from "react-material-ui-carousel";
import EmailIcon from "../icon/EmailIcon";
import LinkedInIcon from "../icon/LinkedInIcon";

const homeHeader = (
    <Box
        sx={(theme) => ({
            //backgroundImage: "url('/img/homeTopImage.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
            marginTop: "10px",
            width: .95,
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 12,
            paddingBottom: 12,
            justifyContent: "space-between",
            gap: 4,
            position: "relative",
        })}
        maxWidth={880}
    >
        <img src="/img/homeTopImage.png"
            style={{
                position: "absolute",
                top: "-20px",
                width: "100%",
                zIndex: "-1",
            }}
        >
        </img>
        <Typography
            variant="h1"
            sx={{
                color: "white",
                fontSize: { xs: 50, sm: 60, md: 70 },
                textAlign: "center",
                fontWeight: "normal"
            }}
        >Empower Your
            <Box
                component="strong"
                sx={(theme) => ({
                    color: color.primary[200]
                })}
            > Generosity </Box>
            <br />
            Donate Seamlessly</Typography>
        <Typography
            variant="h3"
            sx={{
                width: .9,
                color: "white",
                fontSize: { xs: 14, md: 20 },
                textAlign: "center",
            }}
        >
            Connect your wallet, donate through Solana, and receive a verifiable proof of
            your contribution. Empower your generosity with transparency and trust.
        </Typography>
        <Box
            sx={{
                flexGrow: 0,
                display: "flex",
                justifyContent: "center",
                mt: 2,
            }}
        >
            <Button>Donate Now</Button>
        </Box>
    </Box>
);

const sectionStyle = {
    marginTop: 4,
    width: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
};

const howItWorks = (
    <Box
        component={"section"}
        sx={sectionStyle}
    >
        <Typography variant="h6"
            sx={{
                backgroundColor: "#f4e6ff",
                display: "inline",
                borderRadius: 32,
                paddingX: 2,
            }}
        >
            How It Works
        </Typography>
        <Typography variant="h3">
            How Unify Works
        </Typography>
        <Box
            sx={{
                display: { xs: "none", sm: "none", md: "none", lg: "flex" },
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start"
            }}
        >
            <img
                style={{ marginRight: 40 }}
                src="/img/howItWorks_1.png" />
            <img
                style={{ marginTop: 0, marginRight: 5 }}
                src="/img/howItWorks_2.png" />
            <img
                style={{ marginTop: 0 }}
                src="/img/howItWorks_3.png" />
        </Box>
        <Carousel
            duration={1000}
            autoPlay={true}
            interval={2000}
            animation="slide"
            sx={{
                display: { lg: "none" },
                width: 1,
                textAlign: "center",
                minHeight: "702px"
            }}>
            <img
                src="/img/howItWorks_1.png" />
            <img
                src="/img/howItWorks_2.png" />
            <img
                src="/img/howItWorks_3.png" />
        </Carousel>

    </Box>
);

const TeamCard = ({ image, name, position, description, email, linkedin }) => {
    return (
        <Card
            sx={{ width: "267px" }}
        >
            <CardMedia
                sx={{ height: 230 }}
                title={name} image={image}></CardMedia>
            <CardContent>
                <Typography variant="h5">
                    {name}
                </Typography>
                <Typography variant="subtitle1">
                    {position}
                </Typography>
                <Typography variant="body1">
                    {description}
                </Typography>
            </CardContent>
            <CardActionArea
                sx={{ display: "flex", flexDirection: "row", mb: 2}}
            >
                <IconButton>
                    <EmailIcon />
                </IconButton>
                <IconButton>
                    <LinkedInIcon />
                </IconButton>
            </CardActionArea>
        </Card>
    );
}

const teamData = [
    { name: "Matt", position: "Founder & CEO", description: "Favorite Dog Breed" },
    { name: "Matt", position: "Founder & CEO", description: "Favorite Dog Breed" },
    { name: "Matt", position: "Founder & CEO", description: "Favorite Dog Breed" },
    { name: "Matt", position: "Founder & CEO", description: "Favorite Dog Breed" },
    { name: "Matt", position: "Founder & CEO", description: "Favorite Dog Breed" },
    { name: "Matt", position: "Founder & CEO", description: "Favorite Dog Breed" },
    { name: "Matt", position: "Founder & CEO", description: "Favorite Dog Breed" },
    { name: "Matt", position: "Founder & CEO", description: "Favorite Dog Breed" },
];

const whoWeAre = (
    <Box
        component="section"
        sx={sectionStyle}
    >
        <Typography variant="h6">Who we are</Typography>
        <Typography variant="h3">Meet Our Team</Typography>
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                width: .9,
                justifyContent: "center",
                gap: 5,
                flexWrap: "wrap",
            }}
        >
            {teamData.map((t, i) => (
                <TeamCard
                    key={i}
                    image={`/img/team/team_${i}.png`}
                    name={t.name}
                    position={t.position}
                    description={t.description}
                />
            ))}
        </Box>
    </Box>
);

export const Home = () => {
    return (
        <>
            <Box
                component={"section"}
                sx={{
                    backgroundImage: "url('/img/homeTopBackground.png')",
                    backgroundPosition: "top",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: 1,
                    //marginTop: -20,
                    display: "static",
                    //zIndex: -1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <AppBar
                    variant="home"
                />
                {homeHeader}
            </Box >
            {howItWorks}
            {whoWeAre}
            <Footer />
        </>
    );
}