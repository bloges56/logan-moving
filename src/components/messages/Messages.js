import React from "react"
import { MessageList } from "./MessageList"
import { UserList } from "../users/UserList"
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
                <Col xs="4">
                    <UserList />
                </Col>
                <Col xs="4">
                    <MessageList />
                </Col>
            </Row>
        </Container>
    )

}