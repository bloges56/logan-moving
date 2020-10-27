import React, { createContext, useState } from "react"

export const MessagesContext = createContext()

export const MessagesProvider = props => {

    const [ messages, setMessages ] = useState([])

    const getMessages = () => {
        return fetch("http://localhost:8088/messages?_expand=user")
        .then(res => res.json())
        .then(setMessages)
    }

    const sendMessage = message => {
        return fetch("http://localhost:8088/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        })
        .then(getMessages)
    }

    return (
        <MessagesContext.Provider value={{
            messages, getMessages, sendMessage
        }}>
            {props.children}
        </MessagesContext.Provider>
    )

}