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

    //add a job to the database
    const addJob = job => {
        return fetch("http://localhost:8088/jobs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(job)
        })
    }

    const getJobById = id => {
        debugger;
        return fetch(`http://localhost:8088/jobs/${id}?_embed=locations&_expand=client`)
        .then(res => res.json())
    }

    //return the functions through JobsContext
    return (
        <JobsContext.Provider value = {{
            jobs, getJobs, addJob, getJobById
        }}>
            {props.children}
        </JobsContext.Provider>
    )
}