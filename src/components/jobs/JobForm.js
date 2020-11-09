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

    //set state for moveIn and moveOut for adding new locations

    const [ moveIn, setMoveIn ] = useState({
        street: "",
        state: "",
        zip: "",
        description: "",
        moveIn: true
    })

    const [ moveOut, setMoveOut ] = useState({
        street: "",
        state: "",
        zip: "",
        description: "",
        moveIn: false
    })



    //create input controls for movein and moveOut

    const handleControlledInputChangeMoveIn = (event) => {
        const newMoveIn = { ...moveIn }
        newMoveIn[event.target.name] = event.target.value
        setMoveIn(newMoveIn)
    }

    const handleControlledInputChangeMoveOut = (event) => {
        const newMoveOut = { ...moveOut }
        newMoveOut[event.target.name] = event.target.value
        setMoveOut(newMoveOut)
    }

    const getMoveIn = (jobInput) => {
        return jobInput.locations.find(location => {
            return location.moveIn
        })
        
    }

    const getMoveOut = (jobInput) => {
        return jobInput.locations.find(location => {
            return !location.moveIn
        })
    }

    //get the date passed in the url
    const date = new URLSearchParams(useLocation().search).get("date")

    //wait for data
    const [isLoading, setIsLoading] = useState(true)

    //intialize history val
    const history = useHistory()

    //update state of job as the job fields change
    const handleControlledInputChangeJob = event => {
        const newJob = { ...job }
        newJob[event.target.name] = event.target.value
        setJob(newJob)
    }

    //set isloading to false once the clients are fetched
    useEffect(() => {
        getClients()
        .then(() => {
            if(jobId){
                getJobById(jobId)
                .then(jobRes => {
                    const jobDate = { ...jobRes}
                    jobDate.date = jobDate.date - (6 * 3600000)
                    setJob(jobDate)
                    return jobRes
                })
                .then(jobRes => {
                    setMoveIn(getMoveIn(jobRes))
                    return jobRes
                })
                .then(jobRes => {
                    setMoveOut(getMoveOut(jobRes))
                    return jobRes
                })
                .then(() => {
                    setIsLoading(false)
                })
            }
            else{
                setIsLoading(false)
            }
        })
    }, [])
    
    //add the job and locations to the database
    const constructJobAndLocationsObjects = () => {
        setIsLoading(true)
        if(jobId){
            editJob({
                id: parseInt(jobId),
                title: job.title,
                clientId: parseInt(job.clientId),
                date: new Date(job.date).getTime() + (6 * 3600000)
            })
            .then(() => {
                return editLocation({
                    id: moveIn.id,
                    jobId: parseInt(jobId),
                    street: moveIn.street,
                    state: moveIn.state,
                    zip: parseInt(moveIn.zip),
                    description: moveIn.description,
                    moveIn: true
                })
            })
            .then(() => {
                return editLocation({
                    id: moveOut.id,
                    jobId: parseInt(jobId),
                    street: moveOut.street,
                    state: moveOut.state,
                    zip: parseInt(moveOut.zip),
                    description: moveOut.description,
                    moveIn: false
                })
            })
            .then(() => history.push("/jobs"))
        }
        else{
            addJob({
                title: job.title,
                clientId: parseInt(job.clientId),
                date: new Date(job.date).getTime() + (6 * 3600000)
            })
            .then(res => res.json())
            .then(parsedRes => {
                return addLocation({
                    jobId: parsedRes.id,
                    street: moveIn.street,
                    state: moveIn.state,
                    zip: parseInt(moveIn.zip),
                    description: moveIn.description,
                    moveIn: true
                })  
            })
            .then(moveInRes => moveInRes.json())
            .then(parsedMoveIn => {
                addLocation({
                    jobId: parsedMoveIn.jobId,
                    street: moveOut.street,
                    state: moveOut.state,
                    zip: parseInt(moveOut.zip),
                    description: moveOut.description,
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
                    <Input type="date" name="date" id="job-date" value={job?.date} onChange={handleControlledInputChangeJob}/>
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
                    <Input type="text" name="street" id="job-move-in-street" onChange={handleControlledInputChangeMoveIn} value={moveIn?.street} required></Input>
                    <Label for="job-move-in-state">Move-In Location State</Label>
                    <Input type="text" name="state" id="job-move-in-state" onChange={handleControlledInputChangeMoveIn} value={moveIn?.state} required></Input>
                    <Label for="job-move-in-zip">Move-In Location Zip</Label>
                    <Input type="text" name="zip" id="job-move-in-zip" onChange={handleControlledInputChangeMoveIn} value={moveIn?.zip} required></Input>
                    <Label for="job-move-in-desc">Move-In Location Description</Label>
                    <Input type="textarea" name="description" id="job-move-in-desc" onChange={handleControlledInputChangeMoveIn} value={moveIn?.description} required></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="job-move-out-street">Move-Out Location Street</Label>
                    <Input type="text" name="street" id="job-move-out-street" onChange={handleControlledInputChangeMoveOut} value={moveOut?.street} required></Input>
                    <Label for="job-move-out-state">Move-Out Location State</Label>
                    <Input type="text" name="state" id="job-move-out-state" onChange={handleControlledInputChangeMoveOut} value={moveOut?.state} required></Input>
                    <Label for="job-move-out-zip">Move-Out Location Zip</Label>
                    <Input type="text" name="zip" id="job-move-out-zip" onChange={handleControlledInputChangeMoveOut} value={moveOut?.zip} required></Input>
                    <Label for="job-move-out-desc">Move-Out Location Description</Label>
                    <Input type="textarea" name="description" id="job-move-out-desc" onChange={handleControlledInputChangeMoveOut} value={moveOut?.description} required></Input>
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