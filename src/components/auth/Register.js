import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { Row, Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalFooter } from "reactstrap"

//register for component
export const Register = props => {

    //setup references
    const username = useRef()
    const email = useRef()

    //checks whether or not a user already exists 
    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?username=${username.current.value}`)
            .then(_ => _.json())
            .then(user => !!user.length)
    }

    //get history
    const history = useHistory()


    //set up modal for when username is already taken
    const [ modal, setModal ] = useState(false)
    

    const toggle = () => setModal(!modal)
    

    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;

    //on submit event, if the username is not already in the databse, then create a new user
    //otherwise, deisplay the modal
    const handleRegister = (e) => {

        e.preventDefault()

        existingUserCheck()
                .then(check => {
                    if(!check){
                        fetch("http://localhost:8088/users", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                username: username.current.value,
                                email: email.current.value,
                            })
                        })
                        .then(_ => _.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("current_user", createdUser.id)
                                history.push("/")
                            }
                        })
                    }
                    else{
                        toggle()
                    }
                })
    }

    //return the html for the form and modal
    return (
        <>
            <h1>Register</h1>
            <Form onSubmit={handleRegister}>
                <Row form>
                    <FormGroup>
                        <Label for="username-input">Username</Label>
                        <Input type="username" required placeholder="Username" id="username-input" innerRef={username}></Input>
                    </FormGroup>
                </Row>
                <Row form>
                    <FormGroup>
                        <Label for="email-input">Email</Label>
                        <Input required type="email" placeholder="email@example.com" id="email-input" innerRef={email}></Input>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Button type="submit">Submit</Button>
                    </FormGroup>
                </Row>
                <Modal isOpen={modal} toggle={toggle} className="username-modal" external={externalCloseBtn}>
                    <ModalBody>
                        That username is already taken
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </Form>
        </>
    )
}