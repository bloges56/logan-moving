import React, { useEffect, useState, useRef } from "react"
import { Calendar } from "react-calendar"
import { JobsDayList } from "./JobsDayList"
import { Link } from "react-router-dom"
import { Container, Row, Col } from 'reactstrap'

//the main jobs calendar and jobs list component
export const JobsCalendar = () => {
    const [ date, setDate ] = useState()

    const calendar = useRef(null)

    //set the date everytime a new date is selected
    const onChange = newDate => {
        setDate(newDate)
    }

    //initialize date to today
    useEffect(() => {
        const newDate = new Date((Math.ceil((new Date()).getTime() / 86400000) * 86400000) - (19 * 3600000))
        setDate(newDate)
    }, [])

    return (
        <>
            <Container style={{height:"100%"}}>
                <Row>
                    <Col>
                        <Calendar 
                        onChange={onChange}
                        value={date}
                        ref={calendar}
                        
                        />
                    </Col>
                </Row>
                <Row>
                    <JobsDayList date={date?.getTime()}/>
                </Row>
                <Row>
                    <Col>
                        <Link to={`/jobs/form?date=${date?.getTime()}`}>Add Job</Link>
                    </Col>
                </Row>
            </Container>
            
            
        </>
    )
}

