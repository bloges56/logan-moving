import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { ClientsContext } from "./ClientsProvider"
import { Container, Row, Col, Button } from "reactstrap"


export const ClientDetail = () => {
    const { selectedClient, removeClient } = useContext(ClientsContext)


    return (
        <>
        { selectedClient.firstName &&
        <Container>
            <Row>
                <Col>
                    <h3>
                        {selectedClient.firstName + " " + selectedClient.lastName}
                    </h3>
                </Col>
                <Col xs="2">
                    <Link to={`/clients/edit/${selectedClient.id}`}><Button color="warning">Edit</Button></Link>
                </Col>
                <Col>
                    <Button color="danger" onClick={event => {
                        event.preventDefault()
                        removeClient(selectedClient.id)
                    }}>Remove Client</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>Email: {selectedClient.email}</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>Phone: {selectedClient.phone}</h4>
                </Col>
            </Row>
        </Container>
        }
        </>
    )
}