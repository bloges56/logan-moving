import React, { createContext, useState } from "react"
import defaultExport from "../../Settings"

export const WeatherContext = createContext()

export const WeatherProvider = props => {

    const [ currentWeather, setCurrentWeather ] = useState({})


    const getCurrentWeather = () => {
        return fetch(`http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=19013&appid=${defaultExport.weatherKey}`)
        .then(res => res.json())
        .then(setCurrentWeather)
    }

    const getWeatherByCoords = (lat, long) => {
        return fetch(`http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${long}&appid=${defaultExport.weatherKey}`)
        .then(res => res.json())
        .then(setCurrentWeather)
    }

    const getForecast = (location) => {
        return fetch(`http://api.openweathermap.org/data/2.5/forecast?units=imperial&zip=${location.zip}&appid=${defaultExport.weatherKey}`)
        .then(res => res.json())
    }

    const getWeatherByZip = location => {
        return fetch(`http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=${location.zip}&appid=${defaultExport.weatherKey}`)
        .then(res => res.json())
    }

    return (
        <WeatherContext.Provider value={{
            currentWeather, getCurrentWeather, getWeatherByCoords, getForecast, getWeatherByZip
        }}>
            {props.children}
        </WeatherContext.Provider>
    )

}