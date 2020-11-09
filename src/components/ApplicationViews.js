import React, {useState} from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { JobsCalendar } from "./jobs/JobsCalendar"
import { JobsProvider } from "./jobs/JobsProvider"
import { JobForm } from "./jobs/JobForm"
import { AddEmployeesToJob } from "./jobs/AddEmployeesToJob"
import { ClientsProvider } from "./clients/ClientsProvider"
import { LocationsProvider } from "./locations/LocationsProvider"
import { EmployeeJobsProvider } from "./employeeJobs/EmployeeJobsProvider"
import { EmployeesProvider } from "./employees/EmployeesProvider"
import { Clients } from "./clients/Clients"
import { ClientForm } from "./clients/ClientForm"
import { Employees } from "./employees/Employees"
import { EmployeeForm } from "./employees/EmployeeForm"
import { MessagesProvider } from "./messages/MessagesProvider"
import { Messages } from "./messages/Messages"
import { WeatherProvider } from "./weather/WeatherProvider"
import { UsersProvider } from "./users/UsersProvider"
import { SearchProvider } from "./search/SearchProvider"
import { SearchList } from "./search/SearchList"


export const ApplicationViews = () => {

    const getRealTime = async () => {
        if(window.location.href === "http://localhost:3000/messages"){
            return true
        }
        return false
    }

    const [ update, setUpdate ] = useState("")

    const getUpdate = async () => {
        let response = await fetch("http://localhost:8088/messages")

        if (response.status == 502) {
            
            await getUpdate();

        } else if (response.status != 200) {

            await new Promise(resolve => setTimeout(resolve, 1000));
            await getUpdate();

        } else {
            let message = await response.text();
            debugger;
            return message
          } 
    }

    const longPoll = async () => {

        const realTime =  await getRealTime()
        if(realTime){
            const message = await getUpdate()
            setUpdate(message)
            longPoll()
        }
        
    }

    longPoll()

    return (
        <>

            <SearchProvider>
                <Route exact path="/search">
                    <SearchList />
                </Route>
            </SearchProvider>

            <WeatherProvider>
                <Route exact path="/">
                    <Home />
                </Route>
            </WeatherProvider>

            <JobsProvider>

                <EmployeeJobsProvider>

                    <EmployeesProvider>
                        <Route exact path="/jobs/addEmployeesToJob/:jobId(\d+)">
                            <AddEmployeesToJob />
                        </Route>
                    </EmployeesProvider>


                    <WeatherProvider>
                        <LocationsProvider>
                        <Route exact path="/jobs">
                            <JobsCalendar />
                        </Route>
                        </LocationsProvider>
                    </WeatherProvider>

                </EmployeeJobsProvider>
            
                <LocationsProvider>
                    <ClientsProvider>
                        <Route exact path="/jobs/form" >
                            <JobForm />
                        </Route>

                        <Route exact path = "/jobs/edit/:jobId(\d+)">
                            <JobForm />
                        </Route>
                    </ClientsProvider>
                </LocationsProvider>
               
            </JobsProvider>

            <ClientsProvider>
                <Route exact path="/clients">
                    <Clients />
                </Route>

                <Route exact path ="/clients/form">
                    <ClientForm />
                </Route>

                <Route exact path = "/clients/edit/:clientId(\d+)">
                    <ClientForm />
                </Route>
                

            </ClientsProvider>

            <EmployeesProvider>

                <Route exact path = "/employees">
                    <Employees />
                </Route>

                <Route exact path = "/employees/form">
                    <EmployeeForm />
                </Route>

                <Route exact path = "/employees/edit/:employeeId(\d+)">
                    <EmployeeForm />
                </Route>

            </EmployeesProvider>

            <MessagesProvider>

                <UsersProvider>
                    <Route exact path = "/messages">
                        <Messages update={update}/>
                    </Route>
                </UsersProvider>
            </MessagesProvider>

        </>

    )
}