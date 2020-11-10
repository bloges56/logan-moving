import React, { useState, useRef, useContext } from "react"
import { Calendar } from "react-calendar"
import { JobsDayList } from "./JobsDayList"
import { JobsContext } from "./JobsProvider"
import { Link } from "react-router-dom"
import { Container, Row, Col, Button } from 'reactstrap'
import { JobDetail } from "./JobDetail"

//the main jobs calendar and jobs list component
export const JobsCalendar = () => {

    const { selectedJob, setSelectedJob } = useContext(JobsContext)

    const [ date, setDate ] = useState(() => {
        const date = new Date((Math.floor(Date.now() / 86400000) * 86400000) - (6 * 3600000))
        return date
    })

    const calendar = useRef(null)

    //set the date everytime a new date is selected
    const onChange = newDate => {
        setDate(newDate)
        setSelectedJob({})
    }

    return (
        <>
            <Container style={{height:"100%"}}>
                <Row>
                    <Col xs="2">
                        <h1>Jobs</h1>
                    </Col>
                    <Col>
                        <Link to={`/jobs/form`}><Button color="success">Add Job</Button></Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Calendar 
                        onChange={onChange}
                        value={date}
                        ref={calendar}
                        
                        />
                        <JobsDayList date={date}/>
                    </Col>
                    <Col>
                        {selectedJob.title && 
                            <JobDetail />
                        }
                    </Col>
                </Row>
            </Container>
            
            
        </>
    )
}

