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
        <Row style={{height:"300px", overflow:"hidden", overflowY:"scroll", width:"50%", margin:"0"}}>
            {
                jobs.map(job => {
                return <Col key={job.id} xs="6"><Button onClick={e =>{
                    e.preventDefault()
                    setSelectedJobId(job.id)
                }}>{job.title}</Button></Col>
                })
            }
            {selectedJobId !== 0 && 
                <JobDetail jobId={selectedJobId}/>
            }
        </Row>
        }
        <Link to={`/jobs/form?date=${date}`}>Add Job</Link>
        </>
    )
}