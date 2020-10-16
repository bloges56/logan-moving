import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

export const ApplicationViews = props => {
    return (
        <>

            <Route exact path="/login">
                <Login />
            </Route>

            <Route exact path="/register">
                <Register />
            </Route>

            <Route exact path="/">
                <Home />
            </Route>

        </>

    )
}