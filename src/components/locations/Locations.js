import React, { useContext, useState, useEffect } from "react"
import { WeatherContext } from "../weather/WeatherProvider"
import { JobsContext } from "../jobs/JobsProvider"
import { Container, Row, Col } from "reactstrap"


export const Locations = () => {

    
    const { getForecast, getWeatherByZip } = useContext(WeatherContext)
    const { selectedJob } = useContext(JobsContext)

    const [ moveInForecast, setMoveInForecast ] = useState({})
    const [ moveOutForecast, setMoveOutForecast ] = useState({})

    const [ moveInWeather, setMoveInWeather ] = useState({})
    const [ moveOutWeather, setMoveOutWeather ] = useState({})

    const checkDate = () => {
        return (selectedJob.date - (new Date().getTime())) < (5 * 86400000) && (selectedJob.date - (new Date().getTime())) >= 0
    }

    const getWeather = (forecast, location) => {
        const found = forecast.list[0]
        
        forecast.list.forEach(timestamp => {
            if((selectedJob.date - timestamp.dt) < (selectedJob.date - timestamp.dt)){
                found = timestamp
            }
        })

        if(location.moveIn){
            setMoveInWeather(found)
        }
        else{
            setMoveOutWeather(found)
        }
    }

    const Weather = ({weather}) => {
        return (
            <>
                <h3>{weather.main.temp}&#730;F</h3>
            </>
        )
    }

    useEffect(() => {
        if(checkDate){
            getForecast(selectedJob.locations[0])
            .then(forecast => {
                return getWeather(forecast, selectedJob.locations[0])
            })
            .then(() => {
                getForecast(selectedJob.locations[1])
                .then(forecast => {
                    return getWeather(forecast, selectedJob.locations[1])
                })
            })
        }
        else{
            getWeatherByZip(selectedJob.locations[0].zip)
            .then(setMoveInWeather)
            .then(() => {
                getWeatherByZip(selectedJob.locations[1].zip)
                .then(setMoveInWeather)
            })
        }
    }, [])


    return (
        <Container>
        <Row>
                <h3>Move-In Address</h3>
            </Row>
            <Row>
                <Col>
                    <h4>Street:</h4>
                </Col>
                <Col>
                    <h4>State:</h4>
                </Col>
                <Col>
                    <h4>Zip:</h4>
                </Col>
                <Col>
                    <h4>Temp:</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>{selectedJob?.locations[0].street}</h4>
                </Col>
                <Col>
                    <h4>{selectedJob?.locations[0].state}</h4>
                </Col>
                <Col>
                    <h4>{selectedJob?.locations[0].zip}</h4>
                </Col>
                <Col>
                {checkDate() ? <h3>Move Day Temp:</h3> : <h3>Current Temp:</h3>}
                {moveInWeather.main && <Weather weather={moveInWeather}/>}
                </Col>
            </Row>
            <Row>
                <h3>Move-Out Address</h3>
            </Row>
            <Row>
                <Col>
                    <h4>Street</h4>
                </Col>
                <Col>
                    <h4>State</h4>
                </Col>
                <Col>
                    <h4>Zip</h4>
                </Col>
                <Col>
                    <h4>Temp:</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>{selectedJob?.locations[1].street}</h4>
                </Col>
                <Col>
                    <h4>{selectedJob?.locations[1].state}</h4>
                </Col>
                <Col>
                    <h4>{selectedJob?.locations[1].zip}</h4>
                </Col>
                <Col>
                {checkDate() ? <h3>Move Day Temp:</h3> : <h3>Current Temp:</h3>}
                {moveOutWeather.main && <Weather weather={moveOutWeather}/>}
                </Col>
            </Row>     
        </Container>
    )
}