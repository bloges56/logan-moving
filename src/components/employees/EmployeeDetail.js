import React, { useContext } from "react"
import { EmployeesContext } from "./EmployeesProvider"
import { Container, Row, Col, Button } from "reactstrap"

export const EmployeeDetail = () => {

    const { selectedEmployee, fireEmployee } = useContext(EmployeesContext)

    return (
        <>
        {selectedEmployee.firstName &&
            <Container>
                <Row>
                    <Col>
                        <h2>{selectedEmployee.firstName + " " + selectedEmployee.lastName}</h2>
                    </Col>
                    <Col>
                        <Button color="danger" onClick={event => {
                            event.preventDefault()
                            fireEmployee(selectedEmployee.id)
                        }}>Fire</Button>
                    </Col>
                </Row>
            </Container>
        } 
        </>
    )

}