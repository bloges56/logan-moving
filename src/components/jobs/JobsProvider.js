import React, { useState, createContext } from "react"

export const JobsContext = createContext()

export const JobsProvider = props => {

    //set state for jobs
    const [ jobs, setJobs ] = useState([])
    const [selectedJob, setSelectedJob ] = useState([])

    //get all the jobs from the database
    const getJobs = (date) => {
        return fetch(`http://localhost:8088/jobs?date=${date}&_embed=locations&_expand=client`)
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

    //get a job by its id
    const getJobById = id => {
        return fetch(`http://localhost:8088/jobs/${id}?_embed=locations&_expand=client`)
        .then(res => res.json())
    }

    const removeJob = id => {
        return fetch(`http://localhost:8088/jobs/${id}`, {
            method: "DELETE"
        })
            .then(getJobs)
            .then(setSelectedJob({}))
    }

    const editJob = job => {
        return fetch(`http://localhost:8088/jobs/${job.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(job)
        })
    }

    //return the functions through JobsContext
    return (
        <JobsContext.Provider value = {{
            jobs, getJobs, addJob, getJobById, removeJob, editJob, selectedJob, setSelectedJob
        }}>
            {props.children}
        </JobsContext.Provider>
    )
}