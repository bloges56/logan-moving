import React, { useEffect, useState } from "react"
import { Calendar } from "react-calendar"
import { JobsDayList } from "./JobsDayList"
import { JobDetail } from "./JobDetail"
import { Container, Row, Col } from 'reactstrap'

//the main jobs calendar and jobs list component
export const JobsCalendar = () => {
    const [ date, setDate ] = useState()

    //set the date everytime a new date is selected
    const onChange = newDate => {
        setDate(newDate)
    }

    //initialize date to today
    useEffect(() => {
        setDate(new Date())
    }, [])

    return (
        <>
            <Container style={{height:"100%"}}>
                <Row>
                    <Col>
                        <Calendar 
                        onChange={onChange}
                        value={date}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <JobsDayList date={date?.getTime()}/>
                    </Col>
                </Row>
            </Container>
            
            
        </>
    )
}

