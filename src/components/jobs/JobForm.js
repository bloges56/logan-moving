import React, {useContext, useEffect, useState } from "react"
import { JobsContext } from "./JobsProvider"
import { ClientsContext } from "../clients/ClientsProvider"
import { useHistory, useParams, useLocation } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input } from "reactstrap"

export const JobForm = () => {
    //get the addJob function from JobsContext
    const { addJob } = useContext(JobsContext)

    const { clients, getClients } = useContext(ClientsContext)

    //create state for the current job
    const [ job, setJob ] = useState({
        title: ""
    })

    //get the date passed in the url
    const date = new URLSearchParams(useLocation().search).get("date")

    //get job id from url param
    const {jobId} = useParams()

    //wait for data
    const [isLoading, setIsLoading] = useState(true)

    //intialize history val
    const history = useHistory()

    //update state as the field changes
    const handleControlledInputChange = event => {
        const newJob = { ...job }
        newJob[event.target.name] = event.target.value
        setJob(newJob)
    }

    //set isloading to false
    useEffect(() => {
        getClients()
        .then(() => {
            setIsLoading(false)
        })
    }, [])

    //if jobId is in the URL, then get the job

    //format the given date
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    
    //add the job to the database
    const constructJobObject = () => {
        addJob({
            title: job.title,
            clientId: parseInt(job.clientId),
            date: parseInt(date)
        })
        .then(() => history.push("/jobs"))
    }
    

    return (
        <>
            <Form>
                <FormGroup>
                    <Label for="job-title">Title: </Label>
                    <Input className="form-control" type="text" name="title" id="job-title" onChange={handleControlledInputChange} value={job.title} required/>
                </FormGroup>
                <FormGroup>
                    <Label for="job-date">Date: </Label>
                    <Input type="date" name="date" id="job-date" value={formatDate(parseInt(date))} disabled={true}/>
                </FormGroup>
                <FormGroup>
                    <Label for="job-client">Select Client</Label>
                    <Input type="select" name="clientId" id="job-client" onChange={handleControlledInputChange} value={job.clientId}>
                        <option value="0">Select a client</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>
                                {client.firstName + " " + client.lastName}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Button 
                        disabled={isLoading}
                        onClick={event => {
                            event.preventDefault()
                            constructJobObject()
                    }}>
                        Add Job
                    </Button>
                </FormGroup>
            </Form>
        </>
    )

}