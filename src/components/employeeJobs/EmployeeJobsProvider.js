import React, {createContext, useState } from "react"

//create context to be used by other components
export const EmployeeJobsContext = createContext()

//create provider that will pass its props to other components
export const EmployeeJobsProvider = props => {

    const [employeeJobs, setEmployeeJobs ] = useState([])

    const getEmployeeJobs = () => {
        return fetch(`http://localhost:8088/employeeJobs`)
        .then(res => res.json())
        .then(setEmployeeJobs)
    }

    //create state for assigned employees
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
        .then(getEmployeeJobsByJobId(jobId))
        .then(getEmployeeJobs)

    }

    const removeEmployeeJob = (employeeId, jobId) => {
        return fetch(`http://localhost:8088/employeeJobs?employeeId=${employeeId}&jobId=${jobId}`)
        .then(res => res.json())
        .then(parsedRes => {
            return fetch(`http://localhost:8088/employeeJobs/${parsedRes[0].id}`,{
                method: "DELETE"
            })
        })
        .then(getEmployeeJobsByJobId(jobId))
        .then(getEmployeeJobs)
    }

    //return the context with the functions
    return (
        <EmployeeJobsContext.Provider value={{
            assigned, employeeJobs, setAssigned, getEmployeeJobs, getEmployeeJobsByJobId, addEmployeeJob, removeEmployeeJob
        }}>
            {props.children}
        </EmployeeJobsContext.Provider>
    )
}