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
        debugger;
        return fetch(`http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${long}&appid=${defaultExport.weatherKey}`)
        .then(res => res.json())
        .then(setCurrentWeather)
    }

    return (
        <WeatherContext.Provider value={{
            currentWeather, getCurrentWeather, getWeatherByCoords
        }}>
            {props.children}
        </WeatherContext.Provider>
    )

}