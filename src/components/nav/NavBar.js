import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
import { Navbar, Nav, NavItem, NavLink, Form, InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap"
import { LinkContainer } from "react-router-bootstrap"


export const NavBar = () => {

    const history = useHistory()

    const term = useRef("")

    const onSubmit = event => {
        event.preventDefault()
        history.push(`/search?term=${term.current.value}`)
    }

    

    return (
        <Navbar expand="xs">
            <Nav pills>
                <NavItem>
                    <Form onSubmit={onSubmit}>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    Search
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text"  innerRef={term} required/>
                        </InputGroup>
                    </Form>
                </NavItem>
                <LinkContainer to="/">
                    <NavItem>
                        <NavLink href="">Home</NavLink>
                    </NavItem>
                </LinkContainer>
               
               <LinkContainer to="/jobs">
                <NavItem>
                        <NavLink href="">Jobs</NavLink>
                    </NavItem>
               </LinkContainer>

               <LinkContainer to="/clients">
                <NavItem>
                        <NavLink href="">Clients</NavLink>
                    </NavItem>
               </LinkContainer>

               <LinkContainer to="/employees">
                <NavItem>
                        <NavLink href="">Employees</NavLink>
                    </NavItem>
               </LinkContainer>
                
               <LinkContainer to="/messages">
                <NavItem>
                        <NavLink href="">Messages</NavLink>
                    </NavItem>
               </LinkContainer>

            </Nav>
        </Navbar>
    )
}