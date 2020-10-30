import React, { useEffect, useState, useContext } from "react"
import { UsersContext } from "./UsersProvider"
import { ListGroup, ListGroupItem } from "reactstrap"

export const UserList = () => {
    const { setSelectedUser, getUsers, users } = useContext(UsersContext)

    useEffect(() => {
        getUsers()
    }, [])

    return(
        <ListGroup>
            <ListGroupItem key="0" tag="button" action onClick={event => {
                event.preventDefault()
                setSelectedUser({})
            }}>Public Chat</ListGroupItem>
            {users.map(user => {
                return user.id !== parseInt(sessionStorage.getItem("current_user")) && <ListGroupItem key={user.id} tag="button" action onClick={event => {
                    event.preventDefault()
                    setSelectedUser(user)
                }}>{user.username}</ListGroupItem>
            })}
        </ListGroup>
    )
}