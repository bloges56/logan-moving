import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { JobsCalendar } from "./jobs/JobsCalendar"
import { JobsProvider } from "./jobs/JobsProvider"
import { JobForm } from "./jobs/JobForm"

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

                <Route exact path="/jobs/form" >
                    <JobForm />
                </Route>

            </JobsProvider>
        </>

    )
}