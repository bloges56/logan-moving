import React, { useContext, useRef } from "react"
import { SearchContext } from "../search/SearchProvider"
import { Link, useHistory } from "react-router-dom"
import { Navbar, Nav, NavItem, Form, InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap"

export const NavBar = () => {

    const history = useHistory()

    const term = useRef("")

    const onSubmit = event => {
        debugger;
        event.preventDefault()
        history.push(`/search?term=${term.current.value}`)
    }

    return (
        <Navbar expand="xs">
            <Nav navbar>
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
                <NavItem>
                    <Link to="/">home</Link>
                </NavItem>
                <NavItem>
                    <Link to="/jobs">Jobs</Link>
                </NavItem>
                <NavItem>
                    <Link to="/clients">Clients</Link>
                </NavItem>
                <NavItem>
                    <Link to="/employees">Employees</Link>
                </NavItem>
                <NavItem>
                    <Link to="/messages">Messages</Link>
                </NavItem>
            </Nav>
        </Navbar>
    )
}