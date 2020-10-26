import React,{ createContext, useState } from "react"

//create context
export const EmployeesContext = createContext()

//employee provider
export const EmployeesProvider = props => {

    //create state for employees
    const [ employees, setEmployees ] = useState([])

    //get all of the employees
    const getEmployees = () => {
        return fetch('http://localhost:8088/employees')
        .then(res => res.json())
        .then(setEmployees)
    }

    //return the context with the functions
    return (
        <EmployeesContext.Provider value={{
            employees, getEmployees
        }}>
            {props.children}
        </EmployeesContext.Provider>
    )

}