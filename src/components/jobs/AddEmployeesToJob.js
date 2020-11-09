import React, { useState, useContext, useEffect } from "react"
import { EmployeeJobsContext } from "../employeeJobs/EmployeeJobsProvider"
import { EmployeesContext } from "../employees/EmployeesProvider"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from "reactstrap"

export const AddEmployeesToJob = () => {
    //get the jobId passed in the url
    const { jobId } = useParams()
    //get necessary functions from context
    const { employeeJobs, getEmployeeJobs, addEmployeeJob, removeEmployeeJob } = useContext(EmployeeJobsContext)
    const { employees, getEmployees } = useContext(EmployeesContext)

    

    //grab necessary data from database
    useEffect(() => {
        getEmployees()
        .then(getEmployeeJobs)
    }, [])

    

    //function to get all the unAssignedEmployees
    const filterOutAssigned = () => {
        return employees.filter(employee => {
            let check = true;
            if(employeeJobs){
                employeeJobs.forEach(employeeJob => {
                    if(employeeJob.jobId === parseInt(jobId) && employeeJob.employeeId === employee.id){
                        check = false;
                    }
                })
            }
            return check;
        })
    }

    const filterOutUnAssigned = () => {
        return employees.filter(employee => {
            let check = false;
            if(employeeJobs){
                employeeJobs.forEach(employeeJob => {
                    if(employeeJob.jobId === parseInt(jobId) && employeeJob.employeeId === employee.id){
                        check =  true;
                    }
                })
            }
            return check;
        })
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h2>Add Employees</h2>
                    </Col>
                    <Col>
                        <h2>Remove Employees</h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs="4">
                        <ListGroup>
                            {filterOutAssigned().map(employee => {
                                    return <ListGroupItem key={employee.id}><h3>{employee.firstName + " " + employee.lastName}</h3><Button onClick={e=>{
                                        e.preventDefault()
                                        addEmployeeJob(parseInt(jobId), employee.id)
                                    }}>Add</Button></ListGroupItem>}
                                )
                            }
                        </ListGroup>
                    </Col>
                    <Col xs={{ size: 4, offset: 2 }}>
                        <ListGroup>
                            {filterOutUnAssigned().map(employee => {
                                return <ListGroupItem key={employee.id}><h3>{employee.firstName + " " + employee.lastName}</h3><Button onClick={e=>{
                                    e.preventDefault()
                                    removeEmployeeJob(employee.id, parseInt(jobId))
                                }}>Remove</Button></ListGroupItem>
                            })}
                        </ListGroup>
                    </Col>
                </Row>
                
            </Container>
        </>
    )

}