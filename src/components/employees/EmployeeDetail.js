import React, { useContext } from "react"
import { EmployeesContext } from "./EmployeesProvider"
import { Container, Row, Col } from "reactstrap"

export const EmployeeDetail = () => {

    const { selectedEmployee } = useContext(EmployeesContext)

    return (
        <>
        {selectedEmployee.firstName &&
            <Container>
                <Row>
                    <Col>
                        <h2>{selectedEmployee.firstName + " " + selectedEmployee.lastName}</h2>
                    </Col>
                </Row>
            </Container>
        } 
        </>
    )

}