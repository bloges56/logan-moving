import React from "react"
import { ClientList } from "./ClientList"
import { ClientDetail } from "./ClientDetail"
import { Container, Row, Col } from "reactstrap"

export const Clients = () => {


    return (
        <Container>
            <h1>Clients</h1>
            <Row>
                <Col xs="4">
                    <ClientList />
                </Col>
                <Col xs="4">
                    <ClientDetail />
                </Col>
            </Row>
        </Container>
    )
}