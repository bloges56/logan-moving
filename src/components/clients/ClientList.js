import React, { useContext, useEffect } from "react"
import { ClientsContext } from "./ClientsProvider"
import {ListGroup, ListGroupItem, Button } from "reactstrap"

export const ClientList = () => {
    const { clients, getClients, setSelectedClient } = useContext(ClientsContext)

    useEffect(() => {
        getClients()
    }, [])

    return (
        <>
            <ListGroup>
                {clients.map(client => {
                    return <ListGroupItem key={client.id}><Button onClick={e => {
                        e.preventDefault()
                        setSelectedClient(client)
                    }}>{client.firstName + " " + client.lastName}</Button></ListGroupItem>
                })}
            </ListGroup>
        </>
    )
}