import React, { useState, useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { ClientsContext } from "./ClientsProvider"
import { Form, FormGroup, Label, Input, Button, Container, Row, Col } from "reactstrap"


export const ClientForm = () => {

    const { addClient, editClient, getClientById } = useContext(ClientsContext)

    const [client, setClient ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    })

    const {clientId} = useParams()

    const handleControlledInputChange = (event) => {
        const newClient = { ...client }
        newClient[event.target.name] = event.target.value
        setClient(newClient)
    }

    useEffect(() => {
        if(clientId){
            getClientById(clientId)
            .then(res => {
                setClient(res)
            })
        }
    }, [])

    const history = useHistory()

    const constructClient = () => {
        if(clientId){
            editClient({
                id: client.id,
                firstName: client.firstName,
                lastName: client.lastName,
                email: client.email,
                phone: client.phone
            })
            .then(() => {
                history.push("/clients")
            })
        }
        else{
            addClient({
                firstName: client.firstName,
                lastName: client.lastName,
                email: client.email,
                phone: parseInt(client.phone)
            })
            .then(() => {
                history.push("/clients")
            })
        }
    }

    return (
        <Container>
            <Form>
                <Row form>
                    <Col xs="3">
                        <FormGroup>
                            <Label for="clientFirstName">First Name</Label>
                            <Input type="text" name="firstName" id="clientFirstName" value={client.firstName} onChange={handleControlledInputChange} required></Input>
                        </FormGroup>
                    </Col>
                    <Col xs="3">
                        <FormGroup>
                            <Label for="clientLastName">Last Name</Label>
                            <Input type="text" name="lastName" id="clientLastName" value={client.lastName} onChange={handleControlledInputChange} required></Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col xs="4">
                        <FormGroup>
                            <Label for="clientEmail">Email</Label>
                            <Input type="email" name="email" id="clientEmail" value={client.email} onChange={handleControlledInputChange} required></Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col xs="4">
                        <FormGroup>
                            <Label for="clientPhone">Phone Number</Label>
                            <Input type="number" name="phone" id="clientPhone" value={client.phone} onChange={handleControlledInputChange} required></Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Button onClick={event => {
                    event.preventDefault()
                    constructClient()

                }}>{clientId ? "Update" : "Add"}</Button>
            </Form>
        </Container>
    )
}