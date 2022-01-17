import React, {useState, useEffect} from 'react';
import { CssBaseline, Grid } from '@mui/material';
import { ThemeProvider } from "@mui/styles";
import { createTheme } from '@mui/material/styles';

import { getPlacesData, getWeatherData } from './api';
import Header from './components/Header/Header';
import Map from './components/Map/Map';
import List from './components/List/List';

const App = () => {

    const [places, setPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const [childClicked, setChildClicked] = useState(null);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});

    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordinates({ lat: latitude, lng: longitude});
        })
    }, []);

    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating);

        setFilteredPlaces(filteredPlaces)
    }, [rating])

    useEffect(() => {
        if (bounds.sw && bounds.ne) {
        setIsLoading(true);

        getWeatherData(coordinates.lat, coordinates.lng)
            .then((data) => setWeatherData(data))

        getPlacesData(type, bounds.sw, bounds.ne)
            .then((data) => {
                setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                setFilteredPlaces([])
                setIsLoading(false);
            })
        }
    }, [type, bounds]);
    let theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <List 
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8} style={{ paddingLeft: 'unset'}}>
                    <Map 
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid> 
        </ThemeProvider>
    );
}

export default App;