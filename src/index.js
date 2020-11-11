import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Rare } from "./components/Rare.js"
import "bootstrap/dist/css/bootstrap.min.css"
import CommentForm from '../src/components/comments/CommentForm'



ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Rare />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
