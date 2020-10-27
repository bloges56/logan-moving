import React, { createContext, useState } from "react"

export const MessagesContext = createContext()

export const MessagesProvider = props => {

    const [ messages, setMessages ] = useState([])

    const getMessages = () => {
        return fetch("http://localhost:8088/messages?_expand=user")
        .then(res => res.json())
        .then(setMessages)
    }

    return (
        <MessagesContext.Provider value={{
            messages, getMessages
        }}>
            {props.children}
        </MessagesContext.Provider>
    )

}