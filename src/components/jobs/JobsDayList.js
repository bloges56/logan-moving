import React, {useContext, useEffect, useState } from "react"
import { JobsContext } from "./JobsProvider"
import { JobDetail } from "./JobDetail"
import { Row, Col, Button } from "reactstrap"
import { Link } from "react-router-dom"
 
//component that lists out all the jobs of a given date
export const JobsDayList = ({date}) => {
    //grab jobs and getJobs from JobsContext
    const { jobs, getJobs } = useContext(JobsContext)

    const [selectedJobId, setSelectedJobId ] = useState(0)

    //get jobs on render and when the date is selected
    useEffect(() => {
        getJobs(date)
    }, [date])

    
    return (
        <>
        {jobs.length !== 0 &&
        <Col xs="6">
            {
                jobs.map(job => {
                return <Button key={job.id} onClick={e =>{
                    e.preventDefault()
                    setSelectedJobId(job.id)
                }}>{job.title}</Button>
                })
            }
        </Col>
        }
        <Col xs="6">
            {selectedJobId !== 0 && 
                <JobDetail jobId={selectedJobId}/>
            }
        </Col>
        </>
    )
}