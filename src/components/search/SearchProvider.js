import React, { useState, createContext } from "react"

export const SearchContext = createContext()

export const SearchProvider = props => {

    const [ jobs, setJobs] = useState([])

    const [ clients, setClients ] = useState([])

    const [ employees, setEmployees] = useState([])


    const getSearchedJobs = (term) => {
        return fetch(`http://localhost:8088/jobs?q=${term}&_expand=client&_embed=locations`)
        .then(res => res.json())
        .then(setJobs)
    }

    const getSearchedClients = (term) => {
        return fetch(`http://localhost:8088/clients?q=${term}`)
        .then(res => res.json())
        .then(setClients)
    }

    const getSearchedEmployees = (term) => {
        return fetch(`http://localhost:8088/employees?q=${term}`)
        .then(res => res.json())
        .then(setEmployees)
    }

    const getAllSearch = (term) => {
        return getSearchedJobs(term)
        .then(() => {
            getSearchedClients(term)
        })
        .then(() => {
            getSearchedEmployees(term)
        })
    }

    return (
        <SearchContext.Provider value={{
            getAllSearch, jobs, clients, employees
        }}>
            {props.children}
        </SearchContext.Provider>
    )

}