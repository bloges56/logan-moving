import React, { useContext, useEffect } from "react"
import { SearchContext } from "./SearchProvider"
import { useLocation, useHistory } from "react-router-dom"
import { Container, Row, Col, ListGroup, ListGroupItem, Button} from "reactstrap"
import { EmployeesContext } from "../employees/EmployeesProvider"
import { JobsContext } from "../jobs/JobsProvider"

export const SearchList = () => {

    const { getAllSearch, jobs, employees, clients} = useContext(SearchContext)

    const { setSelectedEmployee } = useContext(EmployeesContext)

    const { setSelectedJob } = useContext(JobsContext)

    const term = new URLSearchParams(useLocation().search).get("term")

    useEffect(() => {
        if(term){
            getAllSearch(term)
        }
    }, [term])

    const history = useHistory()

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
                            return <ListGroupItem key={employee.id}>
                                <Button onClick={e => {
                                    setSelectedEmployee(employee)
                                    history.push("/employees")
                                }}>{employee.firstName + " " + employee.lastName}</Button>
                            </ListGroupItem>
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
                            return <ListGroupItem key={job.id}><Button onClick={e => {
                                setSelectedJob(job)
                                history.push("/jobs")
                            }}>{job.title}</Button></ListGroupItem>
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