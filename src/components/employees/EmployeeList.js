import React, { useState, useEffect, useContext } from "react"
import { EmployeesContext } from "./EmployeesProvider"
import { ListGroup, ListGroupItem, Button} from "reactstrap"

export const EmployeeList = () => {
    const { getEmployees, employees, setSelectedEmployee } = useContext(EmployeesContext)

    useEffect(() => {
        getEmployees()
    }, [])

    return (
        <ListGroup>
            {employees.map(employee => {
                return <ListGroupItem key={employee.id}><Button onClick={event => {
                    event.preventDefault()
                    setSelectedEmployee(employee)
                }}>{employee.firstName + " " + employee.lastName}</Button></ListGroupItem>
            })}
        </ListGroup>
    )
}