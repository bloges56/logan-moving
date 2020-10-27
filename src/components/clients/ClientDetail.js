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
                <Col>
                    <Link to={`/clients/edit/${selectedClient.id}`}>Edit</Link>
                </Col>
                <Col>
                    <Button onClick={event => {
                        event.preventDefault()
                        removeClient(selectedClient.id)
                    }}>Remove Client</Button>
                </Col>
            </Row>
        </Container>
        }
        </>
    )
}