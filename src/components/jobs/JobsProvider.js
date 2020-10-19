import React, { useState, createContext } from "react"

export const JobsContext = createContext()

export const JobsProvider = props => {

    //set state for jobs
    const [ jobs, setJobs ] = useState([])

    //get all the jobs from the database
    const getJobs = (date) => {
        return fetch(`http://localhost:8088/jobs?date=${date}`)
        .then(res => res.json())
        .then(setJobs)
    }

    //return the functions through JobsContext

    return (
        <JobsContext.Provider value = {{
            jobs, getJobs
        }}>
            {props.children}
        </JobsContext.Provider>
    )
}