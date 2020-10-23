import React, { useState, useContext, useEffect } from "react"
import { EmployeeJobsContext } from "../employeeJobs/EmployeeJobsProvider"
import { EmployeesContext } from "../employees/EmployeesProvider"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button } from "reactstrap"

export const AddEmployeesToJob = () => {
    //get the jobId passed in the url
    const { jobId } = useParams()
    //get necessary functions from context
    const { assigned, getEmployeeJobsByJobId, addEmployeeJob } = useContext(EmployeeJobsContext)
    const { employees, getEmployees } = useContext(EmployeesContext)

    //grab necessary data from database
    useEffect(() => {

        getEmployees()
        .then(() => {
            getEmployeeJobsByJobId(jobId)
        })


    }, [])


    //filter out employees that are not assigned to the current job
    const notAssigned = employees.filter(employee => {
        let check = true
        assigned.forEach(assignee => {
            if(assignee.employeeId === employee.id){
                check = false
            }
        })
        return check
    })

    debugger;

    return (
        <Container>
        </Container>
    )

}