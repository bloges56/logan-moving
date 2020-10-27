import React, { useEffect, useContext } from "react"
import { WeatherContext } from "./weather/WeatherProvider"
import { Container, Row, Col } from "reactstrap"

export const Home = () => {

    const { currentWeather, getCurrentWeather, getWeatherByCoords } = useContext(WeatherContext)

    let lat = null;
    let long = null;

    const setLatAndLong = (position) => {
        lat = Math.round(position.coords.latitude)
        long = Math.round(position.coords.longitude)
    }

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(setLatAndLong)
    }

    useEffect(() => {
        if(lat){
            getWeatherByCoords(lat, long)
        }
        else{
            getCurrentWeather()
        }
    }, [])

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Logan Moving</h1>
                </Col>
                <Col>
                    <h2>Current Temp: {currentWeather.main?.temp}&#730;F</h2>
                </Col>
            </Row>
        </Container>
    )
}