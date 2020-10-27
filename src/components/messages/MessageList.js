import React, { useContext, useEffect } from "react"
import { MessagesContext } from "./MessagesProvider"
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap"

export const MessageList = () => {

    const { messages, getMessages } = useContext(MessagesContext)

    useEffect(() => {
        getMessages()
    }, [])

    return (
        <ListGroup>
            {messages.map(message => {
                return <ListGroupItem key={message.id}>
                    <ListGroupItemHeading>{message.user?.username}</ListGroupItemHeading>
                    <ListGroupItemText>{message.message}</ListGroupItemText>
                </ListGroupItem>
            })}
        </ListGroup>
    )
}