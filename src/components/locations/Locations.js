import React, { useContext, useState, useEffect } from "react"
import { WeatherContext } from "../weather/WeatherProvider"
import { JobsContext } from "../jobs/JobsProvider"
import { Container, Row, Col } from "reactstrap"


export const Locations = () => {

    
    const { getForecast, getWeatherByZip } = useContext(WeatherContext)
    const { selectedJob } = useContext(JobsContext)

    const  getMoveIn  = () => {
        return selectedJob.locations.find(location => {
            return location.moveIn
        })
    }
    const getMoveOut = () => {
        return selectedJob.locations.find(location => {
            return !location.moveIn
    })}

    const [ moveInWeather, setMoveInWeather ] = useState({})
    const [ moveOutWeather, setMoveOutWeather ] = useState({})

    const checkDate = () => {
        return (selectedJob.date - (new Date().getTime())) <= (5 * 86400000) && (selectedJob.date - (new Date().getTime())) >= 0
    }

    const getWeather = (forecast, moveCheck) => {
        const found = forecast.list[0]
        
        forecast.list.forEach(timestamp => {
            if((selectedJob.date - timestamp.dt) < (selectedJob.date - timestamp.dt)){
                found = timestamp
            }
        })

        if(moveCheck){
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
        if(selectedJob.id){
            if(checkDate){
                getForecast(getMoveIn())
                .then(forecast => {
                    return getWeather(forecast, true)
                })
                .then(() => {
                    getForecast(getMoveOut())
                    .then(forecast => {
                        return getWeather(forecast, false)
                    })
                })
            }
            else{
                getWeatherByZip(getMoveIn().zip)
                .then(setMoveInWeather)
                .then(() => {
                    getWeatherByZip(getMoveOut.zip)
                    .then(setMoveOutWeather)
                })
            }
        }
    }, [selectedJob])


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
            </Row>
            <Row>
                <Col>
                    <h4>{getMoveIn()?.street}</h4>
                </Col>
                <Col>
                    <h4>{getMoveIn()?.state}</h4>
                </Col>
                <Col>
                    <h4>{getMoveIn()?.zip}</h4>
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
            </Row>
            <Row>
                <Col>
                    <h4>{getMoveOut()?.street}</h4>
                </Col>
                <Col>
                    <h4>{getMoveOut()?.state}</h4>
                </Col>
                <Col>
                    <h4>{getMoveOut()?.zip}</h4>
                </Col>
                <Col>
                {checkDate() ? <h3>Move Day Temp:</h3> : <h3>Current Temp:</h3>}
                {moveOutWeather.main && <Weather weather={moveOutWeather}/>}
                </Col>
            </Row>     
        </Container>
    )
}