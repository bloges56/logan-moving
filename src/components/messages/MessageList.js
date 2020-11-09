import React, { useContext, useEffect, useState } from "react"
import { MessagesContext } from "./MessagesProvider"
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, InputGroup, InputGroupAddon, Input, Button } from "reactstrap"
import { UsersContext } from "../users/UsersProvider"

export const MessageList = ({update}) => {

    const { messages, getMessages, sendMessage, deleteMessage, changeMessage, setMessages } = useContext(MessagesContext)

    const { selectedUser } = useContext(UsersContext)


    const [ message, setMessage ] = useState({
        message: "",
        userId: parseInt(sessionStorage.getItem("current_user")),
        recipientId: 0,
        public: true
    })
    
    const [isLoading, setIsLoading ] = useState(false)

    const [ editMessage, setEditMessage ] = useState({
        message: "",
        userId: parseInt(sessionStorage.getItem("current_user")),
        recipientId: 0,
        public: true
    })

    const handleInputControlChangeEdit = event => {
        const newEditMessage = {...editMessage}
        newEditMessage[event.target.name] = event.target.value
        setEditMessage(newEditMessage)
    }

    const handleInputControlChange = event => {
        const newMessage = { ...message }
        newMessage[event.target.name] = event.target.value
        setMessage(newMessage)
    }

    const constructEditMessage = () => {
        if(editMessage.message.trim().length !== 0){
            setIsLoading(true)
            changeMessage({
                id: editMessage.id,
                message: editMessage.message,
                userId: editMessage.userId,
                recipientId: editMessage.recipientId,
                public: editMessage.public
            })
            .then(() => {
                setShowDisplayOnlyMessage(true)
                setIsLoading(false)
            })
        }
    }
    
    const constructMessage = () => {
        if(message.message.trim().length !== 0){
            setIsLoading(true)
            sendMessage({
                message: message.message,
                userId: message.userId,
                recipientId: message.recipientId,
                public: message.public
            })
            .then(() => {
                setMessage({
                    message: "",
                    userId: parseInt(sessionStorage.getItem("current_user")),
                    recipientId: selectedUser.id ? selectedUser.id : 0,
                    public: selectedUser.id !== undefined
                })
                setIsLoading(false)
            })
        }   
    }

    useEffect(() => {
        getMessages()
        .then(parsedMessages => {
            if(selectedUser.id){
                setMessages(parsedMessages.filter(message =>{
                    return !message.public && ((message.userId === parseInt(sessionStorage.getItem("current_user")) && message.recipientId === selectedUser.id) || (message.userId === selectedUser.id && message.recipientId === parseInt(sessionStorage.getItem("current_user"))))
                }))
                setMessage({
                    message: "",
                    userId: parseInt(sessionStorage.getItem("current_user")),
                    recipientId: selectedUser.id,
                    public: false
                })
                setEditMessage({
                    message: "",
                    userId: parseInt(sessionStorage.getItem("current_user")),
                    recipientId: selectedUser.id,
                    public: false
                })
            }
            else{
                setMessages(parsedMessages.filter(message =>{
                    return message.public
                }))
                setMessage({
                    message: "",
                    userId: parseInt(sessionStorage.getItem("current_user")),
                    recipientId: 0,
                    public: true
                })
                setEditMessage({
                    message: "",
                    userId: parseInt(sessionStorage.getItem("current_user")),
                    recipientId: 0,
                    public: true
                })
            }
        })
    }, [selectedUser, isLoading, update])

    const [ showDisplayOnlyMessage, setShowDisplayOnlyMessage ] = useState(true)    

    const DisplayOnlyMessage = ({message}) => {
        return (
            <ListGroupItemText>{message.message}</ListGroupItemText>
        )
    }

    const EditButton = ({message}) => {
        return (
        <Button color="warning" onClick={event => {
            event.preventDefault()
            setEditMessage(message)
            setShowDisplayOnlyMessage(false)
        }}>Edit</Button>
        )
    }

    return (
        <>
            <ListGroup>
                {messages.map(message => {
                    return <ListGroupItem key={message.id}>
                        <ListGroupItemHeading>{message.user?.username}</ListGroupItemHeading>
                        {showDisplayOnlyMessage || message.id !== editMessage.id ? <DisplayOnlyMessage message={message}/> : 
                            <InputGroup>
                                <Input type="text" name="message" value={editMessage.message} onChange={handleInputControlChangeEdit}></Input>
                                <InputGroupAddon addonType="append"><Button disabled={isLoading} onClick={ event => {
                                    event.preventDefault()
                                    constructEditMessage()
                                }}>Edit</Button></InputGroupAddon>
                            </InputGroup>
                        }
                        {message.userId === parseInt(sessionStorage.getItem("current_user")) &&
                            <>
                                {showDisplayOnlyMessage || message.id !== editMessage.id ? <EditButton message={message}/> : <></>}
                                <Button color="danger" disabled={isLoading} onClick={event => {
                                    event.preventDefault()
                                    setIsLoading(true)
                                    deleteMessage(message.id)
                                    .then(() =>{
                                        setIsLoading(false)
                                    })
                                }}>Delete</Button>
                            </>
                        }
                    </ListGroupItem>
                })}
            </ListGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend"><Button disabled={isLoading} onClick={event => {
                    event.preventDefault()
                    constructMessage()
                }}>Send</Button></InputGroupAddon>
                <Input type="text" name="message" value={message.message} onChange={handleInputControlChange} onClick={event => {
                    event.preventDefault()
                    setShowDisplayOnlyMessage(true)
                }} required />
            </InputGroup>
        </>
    )
}