import React, { useState } from "react"
import { Calendar } from "react-calendar"
import { JobsDayList } from "./JobsDayList"


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
            <JobsDayList date={date}/>
        </>
    )
}

