import React,{ useState, createContext } from "react"

export const ClientsContext = createContext()

export const ClientsProvider = props => {

    const [ clients, setClients ] = useState([])
    const [selectedClient, setSelectedClient ] = useState({})

    const getClients = () => {
        return fetch("http://localhost:8088/clients")
        .then(res => res.json())
        .then(setClients)
    }

    const addClient = client => {
        return fetch("http://localhost:8088/clients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(client)
        })
    }

    return (
        <ClientsContext.Provider value= {{
            clients, getClients, selectedClient, setSelectedClient, addClient
        }}>
            {props.children}
        </ClientsContext.Provider>
    )
}