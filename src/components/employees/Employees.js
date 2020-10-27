import React from "react"
import { EmployeeList } from "./EmployeeList"
import { EmployeeDetail } from "./EmployeeDetail"
import { Container, Row, Col } from "reactstrap"
import { Link } from "react-router-dom"


export const Employees = () => {


    return (
        <Container>
            <Row>
                <Col xs="3">
                    <h1>Employees</h1>
                </Col>
                <Col>
                <Link to={`/employees/form`}>Hire Employee</Link>
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