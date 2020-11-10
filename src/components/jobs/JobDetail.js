import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { JobsContext } from "./JobsProvider"
import { EmployeeJobsContext } from "../employeeJobs/EmployeeJobsProvider"
import { Container, Row, Col, Button } from "reactstrap"
import { Locations } from "../locations/Locations"

export const JobDetail = () => {

    //get the needed functions from the conextes
    const { removeJob, selectedJob } = useContext(JobsContext)
    const { assigned, getEmployeeJobsByJobId } = useContext(EmployeeJobsContext)


    useEffect(() => {
        getEmployeeJobsByJobId(selectedJob.id)
    }, [selectedJob])


    return(
        <Container>
            <Row>
                <Col>
                    <h2>{selectedJob?.title}</h2>
                </Col>
            </Row>
            <Row>
                <Col xs="2">
                    <Link to={`/jobs/edit/${selectedJob.id}`}><Button color="warning">Edit</Button></Link>
                </Col>
                <Col>
                    <Button color="danger" onClick={() => {
                        removeJob(selectedJob.id)
                    }}>
                        Remove job
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xs="9">
                    <h3>Client: {selectedJob?.client.firstName + " " + selectedJob?.client.lastName}</h3>
                </Col>
                <Col xs="3">
                    <h4>{new Date(selectedJob?.date).toLocaleDateString()}</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Locations />
                </Col>
            </Row>
            <Container>
                <Row>
                    <Col xs="9">
                        <h3>Assigned Employees</h3>
                    </Col>
                    <Col xs="1">
                        <Link to={`/jobs/addEmployeesToJob/${selectedJob.id}`}><Button color="success">Add/Remove</Button></Link>
                    </Col>
                </Row>
                {
                assigned.map(employee => {
                    return <Row key={employee.employee?.id}>
                        <Col>
                                <h4>{employee.employee.firstName + " " + employee.employee.lastName}</h4>
                        </Col>
                    </Row>
                }) 
                }
            </Container>
        </Container>
    )
}