import React from "react"
import { Route, Redirect } from "react-router-dom"

export const ApplicationViews = () => {
    return <>
      <Route path="/logout" render={() => {
        localStorage.removeItem("rare_user_id")
        return <Redirect to="/login" />
      }} />
    </>
}
