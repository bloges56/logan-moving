import React, { useContext, useEffect, useState } from "react"
import { MessagesContext } from "./MessagesProvider"
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, InputGroup, InputGroupAddon, Input, Button } from "reactstrap"

export const MessageList = () => {

    const { messages, getMessages, sendMessage } = useContext(MessagesContext)

    const [ message, setMessage ] = useState({
        message: "",
        userId: parseInt(localStorage.getItem("current_user")),
        public: true
    })

    const handleInputControlChange = event => {
        const newMessage = { ...message }
        newMessage[event.target.name] = event.target.value
        setMessage(newMessage)
    }

    const constructMessage = () => {
        if(message.message.trim().length !== 0){
            sendMessage({
                message: message.message,
                userId: message.userId,
                public: message.public
            })
            .then(() => {
                setMessage({
                    message: "",
                    userId: parseInt(localStorage.getItem("current_user")),
                    public: true
                })
            })
        }   
    }

    useEffect(() => {
        getMessages()
    }, [])

    return (
        <>
            <ListGroup>
                {messages.map(message => {
                    return <ListGroupItem key={message.id}>
                        <ListGroupItemHeading>{message.user?.username}</ListGroupItemHeading>
                        <ListGroupItemText>{message.message}</ListGroupItemText>
                    </ListGroupItem>
                })}
            </ListGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend"><Button onClick={event => {
                    event.preventDefault()
                    constructMessage()
                }}>Send</Button></InputGroupAddon>
                <Input type="text" name="message" value={message.message} onChange={handleInputControlChange} required />
            </InputGroup>
        </>
    )
}