import React, { useEffect, useContext } from "react"
import { WeatherContext } from "./weather/WeatherProvider"
import { Container, Row, Col } from "reactstrap"

export const Home = () => {

    const { currentWeather, getCurrentWeather } = useContext(WeatherContext)

    useEffect(() => {
        getCurrentWeather()
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