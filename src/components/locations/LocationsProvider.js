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

    const editLocation = location => {
        return fetch(`http://localhost:8088/locations/${location.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(location)
        })
    }

    const getLocationById = id => {
        return fetch(`http://localhost:8088/locations/${id}`)
        .then(res => res.json())
    }

    return (
        <LocationsContext.Provider value={{
            locations, getLocations, addLocation, editLocation, getLocationById
        }}>
            {props.children}
        </LocationsContext.Provider>
    )

}