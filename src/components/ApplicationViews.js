import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { JobsCalendar } from "./jobs/JobsCalendar"
import { JobsProvider } from "./jobs/JobsProvider"

export const ApplicationViews = props => {
    return (
        <>

            <Route exact path="/">
                <Home />
            </Route>

            <JobsProvider>
                <Route exact path="/jobs">
                    <JobsCalendar />
                </Route>
            </JobsProvider>
        </>

    )
}