import React, { useRef, useState } from "react"
import { Row, Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalFooter} from "reactstrap"
import { useHistory, Link } from "react-router-dom"


export const Login = props => {

    //initialize references to username and email
    const username = useRef()
    const email = useRef()

    //returns the user object if it exists and false otherwise
    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?username=${username.current.value}`)
            .then(_ => _.json())
            .then(user => user.length ? user[0] : false)
    }

    //get reference to history
    const history = useHistory()

    //set up modals
    const [ usernameModal, setUsernameModal ] = useState(false)
    const [ emailModal, setEmailModal ] = useState(false)

    const toggleUsernameModal = () => setUsernameModal(!usernameModal)
    const toggleEmailModal = () => setEmailModal(!emailModal)

    const externalCloseBtnUser = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggleUsernameModal}>&times;</button>;
    const externalCloseBtnEmail = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggleEmailModal}>&times;</button>;

    //if the entered information matches a user, then route to home page
    //else tell the that the information does not match
    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists && exists.email === email.current.value) {
                    sessionStorage.setItem("current_user", exists.id)
                    history.push("/")
                }else if (exists && exists.email !== email.current.value) {
                    toggleEmailModal()
                } else if (!exists) {
                    toggleUsernameModal()
                }
            })
    }

    
    //return html form
    return (
        <>
            <h1>Login</h1>
            <Form onSubmit={handleLogin}>
                <Row form>
                    <FormGroup>
                        <Label for="username-input">Username</Label>
                        <Input placeholder="Username" id="username-input" innerRef={username}></Input>
                    </FormGroup>
                </Row>
                <Row form>
                    <FormGroup>
                        <Label for="email-input">Email</Label>
                        <Input type="email" placeholder="email@example.com" id="email-input" innerRef={email}></Input>
                    </FormGroup>
                </Row>
                <Row>
                <FormGroup>
                        <Button type="submit">Submit</Button>
                </FormGroup>
                </Row>
                <Modal isOpen={usernameModal} toggle={toggleUsernameModal} className="username-modal" external={externalCloseBtnUser}>
                    <ModalBody>
                        The username does not match any current users
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={toggleUsernameModal}>Close</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={emailModal} toggle={toggleEmailModal} className="username-modal" external={externalCloseBtnEmail}>
                    <ModalBody>
                        The email does not match the username
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={toggleEmailModal}>Close</Button>
                    </ModalFooter>
                </Modal>
            </Form>
            <div>
                <Link to="/register">Register</Link>
            </div>
        </>
    )

}