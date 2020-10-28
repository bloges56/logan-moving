import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { JobsContext } from "./JobsProvider"
import { EmployeeJobsContext } from "../employeeJobs/EmployeeJobsProvider"
import { Container, Row, Col, Button } from "reactstrap"
import { Locations } from "../locations/Locations"

export const JobDetail = ({jobId, setJobId}) => {

     //format the given date
     function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    //get the needed functions from the conextes
    const { removeJob, selectedJob } = useContext(JobsContext)
    const { assigned, getEmployeeJobsByJobId } = useContext(EmployeeJobsContext)


    useEffect(() => {
        getEmployeeJobsByJobId(selectedJob.id)
    }, [])


    return(
        <Container>
            <Row>
                <Col>
                    <h2>{selectedJob?.title}</h2>
                </Col>
            </Row>
            <Row>
                <Col xs={{size:6, offset:1}}>
                    <h3>Client: {selectedJob?.client.firstName + " " + selectedJob?.client.lastName}</h3>
                </Col>
                <Col xs={{size:5}}>
                    <h4>{formatDate(selectedJob?.date)}</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Locations />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Assigned Employees</h3>
                </Col>
                <Col>
                    <Link to={`/jobs/addEmployeesToJob/${jobId}`}>Add Employees</Link>
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
            <Row>
                <Col>
                    <Link to={`/jobs/edit/${jobId}`}>Edit</Link>
                </Col>
                <Col>
                    <Button color="danger" onClick={() => {
                        removeJob(jobId)
                    }}>
                        Remove job
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}