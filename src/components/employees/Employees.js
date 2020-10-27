import React from "react"
import { EmployeeList } from "./EmployeeList"
import { EmployeeDetail } from "./EmployeeDetail"
import { Container, Row, Col } from "reactstrap"


export const Employees = () => {


    return (
        <Container>
            <Row>
                <Col>
                    <h1>Employees</h1>
                </Col>
            </Row>
            <Row>
                <Col xs="4">
                    <EmployeeList />
                </Col>
                <Col>
                    <EmployeeDetail />
                </Col>
            </Row>
        </Container>
    )

}