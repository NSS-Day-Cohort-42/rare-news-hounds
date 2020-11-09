import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Col, Image, Form, Button, Row } from "react-bootstrap"

export const Register = props => {
  const [ formValues, setFormValues ] = useState({})

  const handleFormChange = e => {
    const updatedFormValues = Object.assign({}, formValues)
    updatedFormValues[e.target.name] = e.target.value
    setFormValues(updatedFormValues)
  }

  const handleFormSubmit = e => {
    e.preventDefault()

    const { first_name, last_name, email, username, password, verifyPassword, profile_image_url, bio } = formValues

    if(password === verifyPassword) {
      const newUser = {
        first_name,
        last_name,
        email,
        username,
        password,
        profile_image_url,
        bio
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
          localStorage.setItem("rare_user_token", res.token)
          localStorage.setItem("rare_user_id", res.user_id)
          props.history.push("/")
        })
    }
    else {
      alert("Your passwords do not match, my man.")
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
              className="my-2"
              name="first_name"
              placeholder="First Name" 
              onChange={handleFormChange} 
              value={formValues.first_name || ''} />

            <Form.Control type="text"
              className="my-2"
              name="last_name"
              placeholder="Last Name"
              onChange={handleFormChange}
              value={formValues.last_name || ''}  />

            <Form.Control type="email"
              className="my-2"
              name="email"
              placeholder="Email"
              onChange={handleFormChange}
              value={formValues.email || ''} />
          </Col>

          <Col sm="12" md="5" className="d-flex flex-column align-items-center justify-content-between">
            <Form.Control type="text"
              className="my-2"
              name="username"
              placeholder="Username"
              onChange={handleFormChange}
              value={formValues.username || ''}  />

            <Form.Control type="password"
              className="my-2"
              name="password"
              placeholder="Password"
              onChange={handleFormChange}
              value={formValues.password || ''}  />

            <Form.Control type="password"
              className="my-2"
              name="verifyPassword"
              placeholder="Verify Password"
              onChange={handleFormChange}
              value={formValues.verifyPassword || ''}  />

            <Form.Control type="text"
              className="my-2"
              name="profile_image_url"
              placeholder="Profile Pic URL"
              onChange={handleFormChange}
              value={formValues.profile_image_url || ''}  />

            <Form.Control as="textarea"
              className="my-2"
              rows={4}
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