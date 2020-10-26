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


    return (
        <ClientsContext.Provider value= {{
            clients, getClients, selectedClient, setSelectedClient
        }}>
            {props.children}
        </ClientsContext.Provider>
    )
}