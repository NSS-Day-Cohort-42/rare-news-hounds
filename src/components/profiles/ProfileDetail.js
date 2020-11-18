import React, { useContext, useEffect, useState } from "react"
import { ProfileContext } from "./ProfileProvider"
import { Image, Badge, Row, Col, Button } from "react-bootstrap"
import Logo from "../nav/newshound.jpg"
import moment from "moment";


export default (props) => {
    const { getProfileById } = useContext(ProfileContext)
    const [profile, setProfile] = useState({})
    const date = moment(profile.created_on).format("dddd, MMMM Do YYYY");

    useEffect(() => {
        const profileId = parseInt(props.match.params.profileId)
        getProfileById(profileId).then(setProfile)
    }, [props.match.params.profileId])
    

   

    return (

        <div className="profileDetail">
            <Row>
            <Col className="d-flex flex-column align-items-start">
            
                
                  <img className="profile__image" src={profile.profile_image_url ? profile.profile_image_url : Logo } fluid />
                 
               
                
                    <p className="profileDetail_name">{profile.fullname}</p>
                
                
            </Col>
            <Col className="justify-content-center my-4">
                <Row>
                <p className="profileDetail_username">{profile.username}</p>
                </Row>
                <Row>
                <p className="profileDetail_email">{profile.email}</p>
                </Row>
                <Row>
                <p className="profileDetail_date">{date}</p>
                </Row>
                <Row>
                <p className="profileDetail_type">{profile.is_staff ? "Admin" : "Author"}</p>
                </Row>
            </Col>
            </Row>

        </div>

    )
}