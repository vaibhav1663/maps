import React, { useEffect } from 'react'
import "./Home.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const Home = () => {
    const [city, setCity] = React.useState('');
    const [type, setType] = React.useState('');
    const [locid, setLocid] = React.useState(0);
    const [date, setDate] = React.useState(dayjs('2023-04-23'));
    const [symbol, setSymbol] = React.useState("");
    const [maxTemp, setMaxTemp] = React.useState("");
    const [minTemp, setMinTemp] = React.useState("");
    const [phrase, setPhrase] = React.useState("");
    var website = "https://www.google.com/maps/embed/v1/place?q=" + city + "&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8";
    var msg = "";
    useEffect(() => {
        if (city !== '') {
            const options = {
                method: 'GET',
                url: 'https://foreca-weather.p.rapidapi.com/location/search/' + city,
                params: { lang: 'en', country: 'in' },
                headers: {
                    'X-RapidAPI-Key': 'ede3c5163fmsh01abdacf07fd2b0p1c0e4bjsn1db1b15be576',
                    'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
                }
            };
            Axios.request(options).then(function (response) {
                setLocid(response.data.locations[0].id);
            }).catch(function (error) {
                console.error(error);
            });
        } else {
            setLocid(0)
        }

    }, [city])
    useEffect(() => {
        if (locid !== 0) {
            const options = {
                method: 'GET',
                url: 'https://foreca-weather.p.rapidapi.com/forecast/daily/' + locid,
                params: { alt: '0', tempunit: 'C', windunit: 'MS', periods: '12', dataset: 'full' },
                headers: {
                    'X-RapidAPI-Key': 'ede3c5163fmsh01abdacf07fd2b0p1c0e4bjsn1db1b15be576',
                    'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
                }
            };

            Axios.request(options).then(function (response) {
                console.log(response.data.forecast);
                response.data.forecast.map(item => {
                    if ("" + date.format("YYYY-MM-DD") === item.date) {
                        setMaxTemp(item.maxTemp);
                        setMinTemp(item.minTemp);
                        setPhrase(item.symbolPhrase);
                        setSymbol(item.symbol);
                    }
                })
            }).catch(function (error) {
                console.error(error);
            });
        } else {

        }

    }, [locid, date])
    const handleChange = (event, newType) => {
        setType(newType);
    };
    if (city === "") {
        website = "https://www.google.com/maps/embed/v1/place?q=pune&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8";
        msg = "Type City name to view more";
    }
    else if (type === "") {
        website = "https://www.google.com/maps/embed/v1/place?q=" + city + "&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8";
        msg = "Showing Map of " + city;
    } else if (type === "bus") {
        website = "https://www.google.com/maps/embed/v1/search?q=Bus+in+" + city + "&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8";
        msg = "Bus Stops in " + city + " will be highlighted";
    }
    else if (type === "rail") {
        website = "https://www.google.com/maps/embed/v1/search?q=Railway+in+" + city + "&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8";
        msg = "Train and Metro Stops in " + city + " will be highlighted";
    } else if (type === "air") {
        website = "https://www.google.com/maps/embed/v1/search?q=Airports+in+" + city + "&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8";
        msg = "Airports in " + city + " will be highlighted";
    } else if (type === "hotels") {
        website = "https://www.google.com/maps/embed/v1/search?q=hotels+in+" + city + "&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8";
        msg = "Hotels in " + city + " will be highlighted";
    } else if (type === "resto") {
        website = "https://www.google.com/maps/embed/v1/search?q=Restorents+in+" + city + "&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8";
        msg = "Restorents in " + city + " will be highlighted";
    }

    return (
        <div className='root'>
            <div className="content">
                <TextField id="city" value={city} label="City" size="normal" margin="normal" fullWidth onChange={(e) => { setCity(e.target.value); }} />
                <ToggleButtonGroup
                    color="primary"
                    value={type}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                >
                    <ToggleButton value="bus">Buses</ToggleButton>
                    <ToggleButton value="air">Airport</ToggleButton>
                    <ToggleButton value="rail">Railways</ToggleButton>
                    <ToggleButton value="hotels">Hotels</ToggleButton>
                    <ToggleButton value="resto">Restorents</ToggleButton>
                    <ToggleButton value="">None</ToggleButton>
                </ToggleButtonGroup>
                <Typography variant="subtitle1" component="h2">
                    {msg}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker
                            label="Controlled picker"
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <Button onClick={() => { }} margin="normal"> weather report: </Button>
                <Card sx={{ display: 'flex', maxWidth:'350px', justifyContent: "space-between", padding: "10px", alignItems: "center"}}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                {phrase}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {"" + minTemp + "/" + maxTemp + "C"}
                            </Typography>
                        </CardContent>
                    </Box>
                    <CardMedia
                        component="img"
                        sx={{ width: 70, height: 70 }}
                        image={"https://developer.foreca.com/static/images/symbols/" + symbol + ".png"}
                        alt="Live from space album cover"
                    />
                </Card>
            </div>
            <div style={{ maxWidth: "100%", overflow: "hidden", color: "red", width: "60vw", height: "100vh" }}>
                <div id="google-maps-display"><iframe title="Gmap" frameBorder="0"
                    src={website} ></iframe>
                </div>
            </div>
        </div>
    )
}

export default Home