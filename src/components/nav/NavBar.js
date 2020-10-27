import React from "react"
import { Link } from "react-router-dom"
import { Navbar, Nav, NavItem, NavLink } from "reactstrap"

export const NavBar = () => {
    return (
        <Navbar expand="xs">
            <Nav navbar>
                <NavItem>
                    <NavLink><Link to="/">home</Link></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink><Link to="/jobs">Jobs</Link></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink><Link to="/clients">Clients</Link></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink><Link to="/employees">Employees</Link></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink><Link to="/messages">Messages</Link></NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    )
}