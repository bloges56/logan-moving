import React from "react"
import { Link } from "react-router-dom"
import { ClientList } from "./ClientList"
import { ClientDetail } from "./ClientDetail"
import { Container, Row, Col, Button } from "reactstrap"

export const Clients = () => {


    return (
        <Container>
            <Row>
                <Col xs="2">
                    <h1>Clients</h1>
                </Col>
                <Col>
                    <Link to={`/clients/form`}><Button color="success">Add Client</Button></Link>
                </Col>
            </Row>
            <Row>
                <Col xs="4">
                    <ClientList />
                </Col>
                <Col xs="8">
                    <ClientDetail />
                </Col>
            </Row>
        </Container>
    )
}