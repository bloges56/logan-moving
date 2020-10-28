import React, { useContext, useEffect, useState } from "react"
import { SearchContext } from "./SearchProvider"
import { useLocation } from "react-router-dom"
import { Container, Row, Col, ListGroup, ListGroupItem} from "reactstrap"

export const SearchList = () => {

    const { getAllSearch, jobs, employees, clients} = useContext(SearchContext)

    

    const term = new URLSearchParams(useLocation().search).get("term")

    useEffect(() => {
        if(term){
            getAllSearch(term)
        }
    }, [term])

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Search Results</h1>
                </Col>
            </Row>
            {employees.length !== 0 && 
            <Row>
                <Col>
                    <h2>Employees</h2>
                    <ListGroup>
                        {employees.map(employee => {
                            return <ListGroupItem key={employee.id}>{employee.firstName + " " + employee.lastName}</ListGroupItem>
                        })}
                    </ListGroup>
                </Col>
            </Row>
            }
            {jobs.length !== 0 && 
            <Row>
                <Col>
                    <h2>Jobs</h2>
                    <ListGroup>
                        {jobs.map(job => {
                            return <ListGroupItem key={job.id}>{job.title}</ListGroupItem>
                        })}
                    </ListGroup>
                </Col>
            </Row>
            }
            {clients.length !== 0 && 
            <Row>
                <Col>
                    <h2>Clients</h2>
                    <ListGroup>
                        {clients.map(client => {
                            return <ListGroupItem key={client.id}>{client.firstName + " " + client.lastName}</ListGroupItem>
                        })}
                    </ListGroup>
                </Col>
            </Row>
            }
        </Container>
    )

}