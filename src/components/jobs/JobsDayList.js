import React, {useContext, useEffect, useState } from "react"
import { JobsContext } from "./JobsProvider"
import { ListGroup, ListGroupItem } from "reactstrap"
import { Link } from "react-router-dom"
 
//component that lists out all the jobs of a given date
export const JobsDayList = ({date}) => {
    //grab jobs and getJobs from JobsContext
    const { jobs, getJobs } = useContext(JobsContext)

    //get jobs on render
    useEffect(() => {
        getJobs(date)
    }, [date])

    return (
        <>
        <ListGroup>
            {
                jobs.map(job => {
                return <ListGroupItem key={job.id}>{job.title}</ListGroupItem>
                })
            }
        </ListGroup>
        <Link to={`/jobs/form?date=${date}`}>Add Job</Link>
        </>
    )
}