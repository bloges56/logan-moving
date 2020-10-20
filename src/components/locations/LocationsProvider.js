import React, { useState, createContext } from "react"

//creat context for exporting functions
export const LocationsContext = createContext()

//provider that will wrap around routes
export const LocationsProvider = props => {

    //set state for the locations array
    const [ locations, setLocations ] = useState([])

    //get all of the locations
    const getLocations = () => {
        return fetch("http://localhost:8088/locations")
        .then(res => res.json())
        .then(setLocations)
    }

    //add location to the database
    const addLocation = location => {
        return fetch("http://localhost:8088/locations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(location)
        })
    }

    return (
        <LocationsContext.Provider value={{
            locations, getLocations, addLocation
        }}>
            {props.children}
        </LocationsContext.Provider>
    )

}