import React, { useEffect, useState } from "react"
import { Calendar } from "react-calendar"
import { JobsDayList } from "./JobsDayList"
import { Link } from "react-router-dom"

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
            <Calendar 
                onChange={onChange}
                value={date}
            /> 
            <JobsDayList date={date?.getTime()}/>
        </>
    )
}

