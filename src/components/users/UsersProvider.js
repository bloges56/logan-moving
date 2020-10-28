import React, {useState, createContext} from "react"

export const UsersContext = createContext()

export const UsersProvider = props => {

    const [ users, setUsers ] = useState([])

    const [ selectedUser, setSelectedUser ] = useState({})

    const getUsers = () => {
        return fetch("http://localhost:8088/users")
        .then(res => res.json())
        .then(setUsers)
    }

    return (
        <UsersContext.Provider value={{
            users, getUsers, selectedUser, setSelectedUser
        }}>
            {props.children}
        </UsersContext.Provider>
    )
}