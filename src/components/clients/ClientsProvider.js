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

    const removeClient = id => {
        return fetch(`http://localhost:8088/clients/${id}`, {
            method: "DELETE"
        })
            .then(getClients)
            .then(() => {
                setSelectedClient({})
            })
    }

    const editClient = client => {
        return fetch(`http://localhost:8088/clients/${client.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(client)
        })
        .then(res => res.json())
        .then(setSelectedClient)
    }

    const getClientById = id => {
        return fetch(`http://localhost:8088/clients/${id}`)
        .then(res => res.json())
    }

    return (
        <ClientsContext.Provider value= {{
            clients, getClients, selectedClient, setSelectedClient, addClient, removeClient, editClient, getClientById
        }}>
            {props.children}
        </ClientsContext.Provider>
    )
}