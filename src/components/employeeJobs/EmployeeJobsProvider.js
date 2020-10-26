import React, {createContext, useState } from "react"

//create context to be used by other components
export const EmployeeJobsContext = createContext()

//create provider that will pass its props to other components
export const EmployeeJobsProvider = props => {

    //create state for employees assigned to a job
    const [ assigned, setAssigned ] = useState([])

    //get an employee job by an id
    const getEmployeeJobsByJobId = jobId => {
        return fetch(`http://localhost:8088/employeeJobs?jobId=${jobId}&_expand=employee`)
        .then(res => res.json())
        .then(setAssigned)
    }

    //add an employeeJob
    const addEmployeeJob = (jobId, employeeId) => {
        return fetch("http://localhost:8088/employeeJobs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                employeeId: employeeId,
                jobId: jobId,
            })
        })

    }

    const removeEmployeeJob = (employeeJob, jobId) => {
        return fetch(`http://localhost:8088/employeeJobs/${employeeJob.id}`, {
            method: "DELETE"
        })
    }

    //return the context with the functions
    return (
        <EmployeeJobsContext.Provider value={{
            assigned, getEmployeeJobsByJobId, addEmployeeJob, removeEmployeeJob
        }}>
            {props.children}
        </EmployeeJobsContext.Provider>
    )
}