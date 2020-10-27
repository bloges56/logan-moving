import React, { createContext, useState } from "react"
import defaultExport from "../../Settings"

export const WeatherContext = createContext()

export const WeatherProvider = props => {

    const [ currentWeather, setCurrentWeather ] = useState({})

    const getCurrentWeather = () => {
        return fetch(`http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=19013&appid=${defaultExport.weatherKey}`)
        .then(res => res.json())
        .then(weather => {
            debugger
            setCurrentWeather(weather)
        })
    }

    return (
        <WeatherContext.Provider value={{
            currentWeather, getCurrentWeather
        }}>
            {props.children}
        </WeatherContext.Provider>
    )

}