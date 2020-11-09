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
        .then(res => res.json())
        .then(setSelectedEmployee)
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

    const editEmployee = employee => {
        return fetch(`http://localhost:8088/employees/${employee.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })
        .then(res => res.json())
        .then(setSelectedEmployee)
    }

    const getEmployeeById = id => {
        return fetch(`http://localhost:8088/employees/${id}`)
        .then(res => res.json())
    }

    //return the context with the functions
    return (
        <EmployeesContext.Provider value={{
            employees, getEmployees, selectedEmployee, setSelectedEmployee, hireEmployee, fireEmployee, editEmployee, getEmployeeById
        }}>
            {props.children}
        </EmployeesContext.Provider>
    )

}