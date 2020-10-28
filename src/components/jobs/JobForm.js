import React, {useContext, useEffect, useState } from "react"
import { JobsContext } from "./JobsProvider"
import { ClientsContext } from "../clients/ClientsProvider"
import { LocationsContext } from "../locations/LocationsProvider"
import { useHistory, useParams, useLocation } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input } from "reactstrap"

export const JobForm = () => {
    //get the addJob function from JobsContext
    const { addJob, getJobById, editJob } = useContext(JobsContext)

    //get clients array and getCLients method from Clients Context
    const { clients, getClients } = useContext(ClientsContext)

    const {jobId} = useParams()

    //get the addLocations method from LocationsContext
    const { addLocation, editLocation } = useContext(LocationsContext)

    //create state for the current job
    const [ job, setJob ] = useState({
        title: "",
        date: ""
    })

    const getMoveIn = () => {
        if(job.id){
            return job.locations.find(location => {
                return location.moveIn
            })
        }
        return {}
    }

    const getMoveOut = () => {
        if(job.id){
            return job.locations.find(location => {
                return !location.moveIn
            })
        }
        return {}
    }

    //set state for move in and move out locations
    const [ moveIn, setMoveIn ] = useState({
        street: "",
        state: "",
        zip: "",
        description: "",
    })
    const [ moveOut, setMoveOut ] = useState({
        street: "",
        state: "",
        zip: "",
        description: "",
    })

    //get the date passed in the url
    const date = new URLSearchParams(useLocation().search).get("date")

    //wait for data
    const [isLoading, setIsLoading] = useState(true)

    //intialize history val
    const history = useHistory()

    //update state of job as the job fields change
    const handleControlledInputChangeJob = event => {
        const newJob = { ...job }
        if(event.target.name === "date"){
            newJob.date = (Math.round((new Date(event.target.value)).getTime() / 86400000) * 86400000) - (19 * 3600000) + 86400000
            debugger;
        }
        else{
            newJob[event.target.name] = event.target.value
        }
        setJob(newJob)
    }

    //set isloading to false once the clients are fetched
    useEffect(() => {
        getClients()
        .then(() => {
            if(jobId){
                getJobById(jobId)
                .then(setJob)
                .then(() => {
                    setIsLoading(false)
                })
            }
            else{
                setIsLoading(false)
            }
        })
    }, [])

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
    
    //add the job and locations to the database
    const constructJobAndLocationsObjects = () => {
        setIsLoading(true)
        if(jobId){
            debugger;
            editJob({
                id: parseInt(jobId),
                title: job.title,
                clientId: parseInt(job.clientId),
                date: parseInt(job.date)
            })
            .then(() => {
                return editLocation({
                    id: getMoveIn().id,
                    jobId: parseInt(jobId),
                    street: getMoveIn().street,
                    state: getMoveIn().state,
                    zip: parseInt(getMoveIn().zip),
                    description: getMoveIn().description,
                    moveIn: true
                })
            })
            .then(() => {
                return editLocation({
                    id: getMoveOut().id,
                    jobId: parseInt(jobId),
                    street: getMoveOut().street,
                    state: getMoveOut().state,
                    zip: parseInt(getMoveOut().zip),
                    description: getMoveOut().description,
                    moveIn: false
                })
            })
            .then(() => history.push("/jobs"))
        }
        else{
            addJob({
                title: job.title,
                clientId: parseInt(job.clientId),
                date: parseInt(date)
            })
            .then(res => res.json())
            .then(parsedRes => {
                return addLocation({
                    jobId: parsedRes.id,
                    street: getMoveIn().street,
                    state: getMoveIn().state,
                    zip: parseInt(getMoveIn().zip),
                    description: getMoveIn().description,
                    moveIn: true
                })  
            })
            .then(moveInRes => moveInRes.json())
            .then(parsedMoveIn => {
                addLocation({
                    jobId: parsedMoveIn.jobId,
                    street: getMoveOut().street,
                    state: getMoveOut().state,
                    zip: parseInt(getMoveOut().zip),
                    description: getMoveOut().description,
                    moveIn: false
                }) 
            })
            .then(() => history.push("/jobs"))
        }
    }

    

    return (
        <>
            <Form>
                <FormGroup>
                    <Label for="job-title">Title: </Label>
                    <Input className="form-control" type="text" name="title" id="job-title" onChange={handleControlledInputChangeJob} value={job?.title} required/>
                </FormGroup>
                <FormGroup>
                    <Label for="job-date">Date: </Label>
                    <Input type="date" name="date" id="job-date" value={formatDate(parseInt(job?.date))} onChange={handleControlledInputChangeJob}/>
                </FormGroup>
                <FormGroup>
                    <Label for="job-client">Select Client</Label>
                    <Input type="select" name="clientId" id="job-client" onChange={handleControlledInputChangeJob} value={job?.clientId} required>
                        <option value="0">Select a client</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>
                                {client.firstName + " " + client.lastName}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="job-move-in-street">Move-In Location Street</Label>
                    <Input type="text" name="street" id="job-move-in-street" onChange={handleControlledInputChangeJob} value={getMoveIn().street} required></Input>
                    <Label for="job-move-in-state">Move-In Location State</Label>
                    <Input type="text" name="state" id="job-move-in-state" onChange={handleControlledInputChangeJob} value={getMoveIn().state} required></Input>
                    <Label for="job-move-in-zip">Move-In Location Zip</Label>
                    <Input type="text" name="zip" id="job-move-in-zip" onChange={handleControlledInputChangeJob} value={getMoveIn().zip} required></Input>
                    <Label for="job-move-in-desc">Move-In Location Description</Label>
                    <Input type="textarea" name="description" id="job-move-in-desc" onChange={handleControlledInputChangeJob} value={getMoveIn().description} required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="job-move-out-street">Move-Out Location Street</Label>
                    <Input type="text" name="street" id="job-move-out-street" onChange={handleControlledInputChangeJob} value={getMoveOut().street} required></Input>
                    <Label for="job-move-out-state">Move-Out Location State</Label>
                    <Input type="text" name="state" id="job-move-out-state" onChange={handleControlledInputChangeJob} value={getMoveOut().state} required></Input>
                    <Label for="job-move-out-zip">Move-Out Location Zip</Label>
                    <Input type="text" name="zip" id="job-move-out-zip" onChange={handleControlledInputChangeJob} value={getMoveOut().zip} required></Input>
                    <Label for="job-move-out-desc">Move-Out Location Description</Label>
                    <Input type="textarea" name="description" id="job-move-out-desc" onChange={handleControlledInputChangeJob} value={getMoveOut().description} required></Input>
                </FormGroup>
                <FormGroup>
                    <Button 
                        disabled={isLoading}
                        onClick={event => {
                            event.preventDefault()
                            constructJobAndLocationsObjects()
                    }}>
                        {jobId ? "Update Job" : "Add Job"}
                    </Button>
                </FormGroup>
            </Form>
        </>
    )

}