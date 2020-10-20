import React, { useContext, useEffect, useState } from "react"
import { JobsContext } from "./JobsProvider"
import { Container, Row, Col } from "reactstrap"

export const JobDetail = ({jobId}) => {

    const { getJobById } = useContext(JobsContext)

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
                <Col xs={{size:1, offset:10}}>
                    <h4>{new Date(job?.date).toString()}</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Client: {job?.client.firstName + " " + job?.client.lastName}</h3>
                </Col>
            </Row>
            <Row>
                <h3>Move-In Address</h3>
                <Col>
                    <h4>Street: {job?.locations[0].street}</h4>
                </Col>
                <Col>
                    <h4>State: {job?.locations[0].state}</h4>
                </Col>
                <Col>
                    <h4>Zip: {job?.locations[0].zip}</h4>
                </Col>
            </Row>
            <Row>
                <h3>Move-Out Address</h3>
                <Col>
                    <h4>Street: {job?.locations[1].street}</h4>
                </Col>
                <Col>
                    <h4>State: {job?.locations[1].state}</h4>
                </Col>
                <Col>
                    <h4>Zip: {job?.locations[1].zip}</h4>
                </Col>
            </Row>
        </Container>
    )
}