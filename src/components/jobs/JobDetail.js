import React, { useContext, useEffect, useState } from "react"
import { JobsContext } from "./JobsProvider"
import { Container, Row, Col, Button } from "reactstrap"

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

    const { getJobById, removeJob } = useContext(JobsContext)

    const[ job, setJob ] = useState(null)

    useEffect(() => {
        getJobById(jobId)
        .then((response) => {
            setJob(response)
        })
    }, [])


    return(
        <Container>
            <Row>
                <Col>
                    <h2>{job?.title}</h2>
                </Col>
            </Row>
            <Row>
                <Col xs={{size:6, offset:1}}>
                    <h3>Client: {job?.client.firstName + " " + job?.client.lastName}</h3>
                </Col>
                <Col xs={{size:5}}>
                    <h4>{formatDate(job?.date)}</h4>
                </Col>
            </Row>
            <Row>
                <h3>Move-In Address</h3>
            </Row>
            <Row>
                <Col>
                    <h4>Street:</h4>
                </Col>
                <Col>
                    <h4>State:</h4>
                </Col>
                <Col>
                    <h4>Zip:</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>{job?.locations[0].street}</h4>
                </Col>
                <Col>
                    <h4>{job?.locations[0].state}</h4>
                </Col>
                <Col>
                    <h4>{job?.locations[0].zip}</h4>
                </Col>
            </Row>
            <Row>
                <h3>Move-Out Address</h3>
            </Row>
            <Row>
                <Col>
                    <h4>Street</h4>
                </Col>
                <Col>
                    <h4>State</h4>
                </Col>
                <Col>
                    <h4>Zip</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>{job?.locations[1].street}</h4>
                </Col>
                <Col>
                    <h4>{job?.locations[1].state}</h4>
                </Col>
                <Col>
                    <h4>{job?.locations[1].zip}</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button color="danger" onClick={() => {
                        removeJob(jobId)
                        .then(() => {
                            setJobId(0)
                        })
                    }}>
                        Remove job
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}