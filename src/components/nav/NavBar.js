import React from "react"
import { Link } from "react-router-dom"
import { Navbar, Nav, NavItem, NavLink } from "reactstrap"

export const NavBar = () => {
    return (
        <Navbar expand="xs">
            <Nav navbar>
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