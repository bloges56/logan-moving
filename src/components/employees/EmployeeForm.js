import React, { useState, useContext, useEffect } from "react"
import { EmployeesContext } from "./EmployeesProvider"
import { useHistory, useParams } from "react-router-dom"
import { Form, FormGroup, Input, Label, Button, Container, Row, Col } from "reactstrap"

export const EmployeeForm = () => {

    const { hireEmployee, getEmployeeById, editEmployee } = useContext(EmployeesContext)

    const [ employee, setEmployee ] = useState({
        firstName: "",
        lastName: "",
        dateHired: "",
        phone: ""
    })

    const {employeeId} = useParams()

    useEffect(() => {
        if(employeeId){
            getEmployeeById(employeeId)
            .then(res => {
                setEmployee(res)
            })
        }
    }, [])

    const handleInputControlChange = event => {
        const newEmployee = { ...employee }
        newEmployee[event.target.name] = event.target.value
        setEmployee(newEmployee)
    }

    const history = useHistory()

    const constructEmployee = () => {
        if(employeeId){
            editEmployee({
                id: employee.id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                dateHired: employee.dateHired,
                phone: parseInt(employee.phone)
            })
            .then(() => {
                history.push("/employees")
            })
        }
        else{
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
    }

    return (
        <Container>
            <Form>
                <Row form>
                    <Col xs="4">
                        <FormGroup>
                            <Label for="employeeFirstName">First Name</Label>
                            <Input type="text" name="firstName" id="employeeFirstName" value={employee.firstName} onChange={handleInputControlChange} required></Input>
                        </FormGroup>
                    </Col>
                    <Col xs="4">
                        <FormGroup>
                            <Label for="employeeLastName">Last Name</Label>
                            <Input type="text" name="lastName" id="employeeLastName" value={employee.lastName} onChange={handleInputControlChange} required></Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col xs="4">
                        <FormGroup>
                            <Label for="employeePhone">Phone Number</Label>
                            <Input type="number" name="phone" id="employeePhone" value={employee.phone} onChange={handleInputControlChange} required></Input>
                        </FormGroup>
                    </Col>
                </Row>
                
                <Button onClick={event => {
                    event.preventDefault()
                    constructEmployee()
                }}>
                    {employeeId ? "Update" : "Hire"}
                </Button>
            </Form>
        </Container>
    )

}