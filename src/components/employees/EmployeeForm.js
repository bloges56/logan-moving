import React, { useState, useContext } from "react"
import { EmployeesContext } from "./EmployeesProvider"
import { useHistory } from "react-router-dom"
import { Form, FormGroup, Input, Label, Button } from "reactstrap"

export const EmployeeForm = () => {

    const { hireEmployee } = useContext(EmployeesContext)

    const [ employee, setEmployee ] = useState({
        firstName: "",
        lastName: "",
        dateHired: "",
        phone: ""
    })

    const handleInputControlChange = event => {
        const newEmployee = { ...employee }
        newEmployee[event.target.name] = event.target.value
        setEmployee(newEmployee)
    }

    const history = useHistory()

    const constructEmployee = () => {
        hireEmployee({
            firstName: employee.firstName,
            lastName: employee.lastName,
            dateHired: (new Date()).getTime(),
            phone: parseInt(employee.phone)
        })
        .then(() => {
            history.push("/employees")
        })
    }

    return (
        <Form>
            <FormGroup>
                <Label for="employeeFirstName">First Name</Label>
                <Input type="text" name="firstName" id="employeeFirstName" value={employee.firstName} onChange={handleInputControlChange} required></Input>
            </FormGroup>
            <FormGroup>
                <Label for="employeeLastName">Last Name</Label>
                <Input type="text" name="lastName" id="employeeLastName" value={employee.lastName} onChange={handleInputControlChange} required></Input>
            </FormGroup>
            <FormGroup>
                <Label for="employeePhone">Phone Number</Label>
                <Input type="number" name="phone" id="employeePhone" value={employee.phone} onChange={handleInputControlChange} required></Input>
            </FormGroup>
            <Button onClick={event => {
                event.preventDefault()
                constructEmployee()
            }}>
                Hire
            </Button>
        </Form>
    )

}