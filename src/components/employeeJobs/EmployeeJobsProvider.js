import React, {createContext, useState } from "react"

//create context to be used by other components
export const EmployeeJobsContext = createContext()

//create provider that will pass its props to other components
export const EmployeeJobsProvider = props => {

    //create state for employeeJobs
    const [ employeeJobs, setEmployeeJobs ] = useState([])

    //get an employee job by an id
    const getEmployeeJobsByJobId = jobId => {
        return fetch(`http://localhost:8088/employeeJobs?jobId=${jobId}&_expand=employee`)
        .then(res => res.json())
    }


    //return the context with the functions
    return (
        <EmployeeJobsContext.Provider value={{
            getEmployeeJobsByJobId
        }}>
            {props.children}
        </EmployeeJobsContext.Provider>
    )
}