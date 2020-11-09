import React, { useState } from "react"
import { Link } from "react-router-dom"
<<<<<<< HEAD
import "./Auth.css"
import Button from "react-bootstrap/Button"

export const Register = (props) => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "email": email.current.value,
                "password": password.current.value
            }

            return fetch("http://localhost:8000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    
                        localStorage.setItem("rare_user_id", res.id)
                        props.history.push("/")
                    
                })
        } else {
            passwordDialog.current.showModal()
        }
=======
import { Col, Image, Form, Button, Row } from "react-bootstrap"

export const Register = props => {
  const [ formValues, setFormValues ] = useState({})

  /**
   * Handle a controlled form input change. Update formValues in state to reflect new form state.
   * @param {Event} e Event object for form control onChange
   */
  const handleFormChange = e => {
    const updatedFormValues = Object.assign({}, formValues)
    updatedFormValues[e.target.name] = e.target.value
    setFormValues(updatedFormValues)
  }

  /**
   * Handle the register form submit. Verify that the passwords match, then post the new user to the API.
   * @param {Event} e Event object for form submission.
   */
  const handleFormSubmit = e => {
    e.preventDefault()

    // grab all of the values off the formValues state object for each form input
    const { first_name, last_name, email, username, password, verifyPassword, profile_image_url, bio } = formValues

    if(password === verifyPassword) {
      // Create an object for the new user... all fields are required except for profile_image_url and bio in the form,
      // so just set those to empty string manually if still undefined at this point
      const newUser = {
        first_name,
        last_name,
        email,
        username,
        password,
        profile_image_url: profile_image_url || '',
        bio: bio || ''
      }

      return fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(newUser)
      })
        .then(res => res.json())
        .then(res => {
          // After successful POST to /register, response will contain auth token and RareUser id, set those in localStorage
          // and redirect us on to the app with those values set
          localStorage.setItem("rare_user_token", res.token)
          localStorage.setItem("rare_user_id", res.user_id)
          props.history.push("/")
        })
    }
    else {
      alert("Your passwords do not match, my man.")
>>>>>>> main
    }
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1 className="text-center">Rare</h1>
      <Form onSubmit={handleFormSubmit}>
        <Row className="justify-content-around" style={{ minHeight: '450px' }}>

          <Col sm="12" md="5" className="d-flex flex-column align-items-center justify-content-between">
            <Image 
              className="my-2"
              src={formValues.profile_image_url || "imagePlaceholder.png"} 
              width={250} 
              height={250} />

            <Form.Control type="text" 
              required
              className="my-2"
              name="first_name"
              placeholder="First Name" 
              onChange={handleFormChange} 
              value={formValues.first_name || ''} />

            <Form.Control type="text"
              required
              className="my-2"
              name="last_name"
              placeholder="Last Name"
              onChange={handleFormChange}
              value={formValues.last_name || ''}  />

            <Form.Control type="email"
              required
              className="my-2"
              name="email"
              placeholder="Email"
              onChange={handleFormChange}
              value={formValues.email || ''} />
          </Col>

          <Col sm="12" md="5" className="d-flex flex-column align-items-center justify-content-between">
            <Form.Control type="text"
              required
              className="my-2"
              name="username"
              placeholder="Username"
              onChange={handleFormChange}
              value={formValues.username || ''}  />

            <Form.Control type="password"
              required
              className="my-2"
              name="password"
              placeholder="Password"
              onChange={handleFormChange}
              value={formValues.password || ''}  />

            <Form.Control type="password"
              required
              className="my-2"
              name="verifyPassword"
              placeholder="Verify Password"
              onChange={handleFormChange}
              value={formValues.verifyPassword || ''}  />

            <Form.Control type="text"
              className="my-2"
              maxLength={100}
              name="profile_image_url"
              placeholder="Profile Pic URL"
              onChange={handleFormChange}
              value={formValues.profile_image_url || ''}  />

            <Form.Control as="textarea"
              className="my-2"
              rows={4}
              maxLength={300}
              name="bio"
              placeholder="Bio"
              onChange={handleFormChange}
              value={formValues.bio || ''}  />
          </Col>
        </Row>

        <Button type="submit" variant="success" className="d-block mx-auto my-4 w-25">Register</Button>
      </Form>

      <Row className="justify-content-center">
        <Link to="/login">Already Have an account? Click here to log in!</Link>
      </Row>
    </main>
  )
}