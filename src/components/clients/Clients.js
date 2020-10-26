import React, {useState, useContext, useEffect } from "react"
import { ClientsContext } from "./ClientsProvider"

export const Clients = () => {
    const [selectedClient, setSelectedClient ] = useState({})

    const { clients, getClients } = useContext(ClientsContext)

    useEffect(() => {
        getClients()
    }, [])
    debugger;
    return (
        <>

        </>
    )
}