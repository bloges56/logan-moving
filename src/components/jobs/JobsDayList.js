import React, {useContext, useEffect, useState } from "react"
import { JobsContext } from "./JobsProvider"
import { Container, Row, Col } from "reactstrap"
import { Link } from "react-router-dom"
 
//component that lists out all the jobs of a given date
export const JobsDayList = ({date}) => {
    //grab jobs and getJobs from JobsContext
    const { jobs, getJobs } = useContext(JobsContext)

    //get jobs on render
    useEffect(() => {
        getJobs(date)
    }, [date])

    if(jobs.length != 0){
        return (
            <>
            <Container style={{height:"300px", overflow:"hidden", overflowY:"scroll", width:"50%", margin:"0"}}>
                {
                    jobs.map(job => {
                    return <Row key={job.id}>
                        <Col xs="6">{job.title}</Col>
                    </Row>
                    })
                }
                </Container>
            <Link to={`/jobs/form?date=${date}`}>Add Job</Link>
            </>
        )
    }
    else{
        return (
            <Link to={`/jobs/form?date=${date}`}>Add Job</Link>
        )
    }
}