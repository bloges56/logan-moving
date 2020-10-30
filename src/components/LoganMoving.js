import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { NavBar } from "./nav/NavBar"
import { SearchProvider } from "./search/SearchProvider"

export const LoganMoving = () =>{

    return (
        <>
            <Route render={() => {
                if (sessionStorage.getItem("current_user")) {
                    return (
                        <>
                            <SearchProvider>
                                <NavBar />
                            </SearchProvider>

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
}