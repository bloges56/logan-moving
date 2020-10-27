import React,{ createContext, useState } from "react"

//create context
export const EmployeesContext = createContext()

//employee provider
export const EmployeesProvider = props => {

    //create state for employees
    const [ employees, setEmployees ] = useState([])

    const [ selectedEmployee, setSelectedEmployee ] = useState({})

    //get all of the employees
    const getEmployees = () => {
        return fetch('http://localhost:8088/employees')
        .then(res => res.json())
        .then(setEmployees)
    }

    const hireEmployee = employee => {
        return fetch("http://localhost:8088/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })
    }

    const fireEmployee = id => {
        return fetch(`http://localhost:8088/employees/${id}`, {
            method: "DELETE"
        })
            .then(getEmployees)
            .then(() => {
                setSelectedEmployee({})
            })
    }

    //return the context with the functions
    return (
        <EmployeesContext.Provider value={{
            employees, getEmployees, selectedEmployee, setSelectedEmployee, hireEmployee, fireEmployee
        }}>
            {props.children}
        </EmployeesContext.Provider>
    )

}