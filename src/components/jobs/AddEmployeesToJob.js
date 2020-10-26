import React, { useState, useContext, useEffect } from "react"
import { EmployeeJobsContext } from "../employeeJobs/EmployeeJobsProvider"
import { EmployeesContext } from "../employees/EmployeesProvider"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from "reactstrap"

export const AddEmployeesToJob = () => {
    //get the jobId passed in the url
    const { jobId } = useParams()
    //get necessary functions from context
    const { assigned, getEmployeeJobsByJobId, addEmployeeJob, removeEmployeeJob } = useContext(EmployeeJobsContext)
    const { employees, getEmployees } = useContext(EmployeesContext)

    //grab necessary data from database
    useEffect(() => {

        getEmployees()
        .then(() => {
            getEmployeeJobsByJobId(jobId)
        })


    }, [assigned])


    //filter out employees that are not assigned to the current job
    const notAssigned = employees.filter(employee => {
        let check = true
        assigned.forEach(assignee => {
            if(assignee.employeeId === employee.id){
                check = false
            }
        })
        return check
    })


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
                            {notAssigned.map(employee => {
                                return <ListGroupItem key={employee.id}><h3>{employee.firstName + " " + employee.lastName}</h3><Button onClick={e=>{
                                    e.preventDefault()
                                    addEmployeeJob(parseInt(jobId), employee.id)
                                }}>Add</Button></ListGroupItem>
                            })}
                        </ListGroup>
                    </Col>
                    <Col xs={{ size: 4, offset: 2 }}>
                        <ListGroup>
                            {assigned.map(employee => {
                                return <ListGroupItem key={employee.employeeId}><h3>{employee.employee.firstName + " " + employee.employee.lastName}</h3><Button onClick={e=>{
                                    e.preventDefault()
                                    removeEmployeeJob(employee, parseInt(jobId))
                                }}>Remove</Button></ListGroupItem>
                            })}
                        </ListGroup>
                    </Col>
                </Row>
                
            </Container>
        </>
    )

}