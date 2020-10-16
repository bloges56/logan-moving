import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
import { Row, Button, Form, FormGroup, Label, Input } from "reactstrap"

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

    const history = useHistory()

    const handleRegister = (e) => {

        e.preventDefault()

        existingUserCheck()
                .then(() => {
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
                })
    }

    return (
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
        </Form>
    )
}