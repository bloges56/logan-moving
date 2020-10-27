import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { NavBar } from "./nav/NavBar"

export const LoganMoving = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("current_user")) {
                return (
                    <>
                        <NavBar />
                        <ApplicationViews />  
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login">
			<Login />
        </Route>
        <Route path="/register">
			<Register />
        </Route>
    </>
)