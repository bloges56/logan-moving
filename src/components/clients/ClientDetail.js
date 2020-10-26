import React, { useContext } from "react"
import { ClientsContext } from "./ClientsProvider"
import { Container, Row, Col } from "reactstrap"


export const ClientDetail = () => {
    const { selectedClient } = useContext(ClientsContext)

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
            </Row>
        </Container>
        }
        </>
    )
}