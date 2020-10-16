import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { Login } from "./auth/Login"

export const ApplicationViews = props => {
    return (
        <>

            <Route exact path="/login">
                <Login />
            </Route>

            <Route exact path="/">
                <Home />
            </Route>

        </>

    )
}