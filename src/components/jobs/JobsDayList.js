import React, {useContext, useEffect, useState } from "react"
import { JobsContext } from "./JobsProvider"
import { JobDetail } from "./JobDetail"
import { Row, Col, Button } from "reactstrap"

 
//component that lists out all the jobs of a given date
export const JobsDayList = ({date}) => {
    //grab jobs and getJobs from JobsContext
    const { jobs, getJobs, setSelectedJob} = useContext(JobsContext)

    //get jobs on render and when the date is selected
    useEffect(() => {
        getJobs(date.getTime())
    }, [date])

    

    return (
        <>
        {jobs.length !== 0 &&
        <Col xs="6">
            {
                jobs.map(job => {
                return <Button key={job.id} onClick={e =>{
                    e.preventDefault()
                    setSelectedJob(job)
                }}>{job.title}</Button>
                })
            }
        </Col>
        }
        </>
    )
}