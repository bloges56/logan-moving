import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { JobsCalendar } from "./jobs/JobsCalendar"
import { JobsProvider } from "./jobs/JobsProvider"
import { JobForm } from "./jobs/JobForm"
import { ClientsProvider } from "./clients/ClientsProvider"

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

                <ClientsProvider>
                    <Route exact path="/jobs/form" >
                        <JobForm />
                    </Route>
                </ClientsProvider>

            </JobsProvider>
        </>

    )
}