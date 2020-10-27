import React from "react"
import { MessageList } from "./MessageList"
import { Container, Row, Col } from "reactstrap"

export const Messages = () => {


    return (
        <Container>
            <Row>
                <Col>
                    <h1>
                        Messages
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col xs="2">
                    <MessageList />
                </Col>
            </Row>
        </Container>
    )

}