import React, { useState } from "react"
import { Calendar } from "react-calendar"
import { JobsDayList } from "./JobsDayList"
import { Link } from "react-router-dom"


export const JobsCalendar = () => {
    const [ date, setDate ] = useState()

    const onChange = newDate => {
        setDate(newDate)
    }

    return (
        <>
            <Calendar 
                onChange={onChange}
                value={date}
            /> 
            <JobsDayList date={date?.getTime()}/>
            <Link to={`/jobs/form?date=${date?.getTime()}`}>Add Job</Link>
        </>
    )
}

