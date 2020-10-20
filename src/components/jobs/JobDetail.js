import React, { useContext, useEffect, useState } from "react"
import { JobsContext } from "./JobsProvider"

export const JobDetail = ({jobId}) => {

    const { getJobById } = useContext(JobsContext)

    const[ job, setJob ] = useState({})

    useEffect(() => {
        getJobById(jobId)
        .then((response) => {
            debugger;
        })
    }, [])

    return(
        <>
        </>
    )
}