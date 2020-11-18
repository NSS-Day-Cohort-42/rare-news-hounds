import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ProfileContext } from "./ProfileProvider"
import { Row, Col } from "react-bootstrap"
import Logo from "../nav/newshound.jpg"
import moment from "moment";
import SubscribeButton from "../subscriptions/SubscribeButton";

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
            <SubscribeButton authorId={profile.id}/>
            <Row>
            <Col className="d-flex flex-column align-items-start">
                <img className="profile__image" src={profile.profile_image_url ? profile.profile_image_url : Logo } fluid />
                <p className="profileDetail_name">{profile.fullname}</p>
            </Col>
            <Col className="justify-content-center my-4">
                <p className="profileDetail_username">{profile.username}</p>
                <p className="profileDetail_email">{profile.email}</p>
                <p className="profileDetail_date">{date}</p>
                <p className="profileDetail_type">{profile.is_staff ? "Admin" : "Author"}</p>
                <Link to={`/profiles/${profile.id}/posts`}>Posts Authored: {profile.post_count}</Link>
            </Col>
            </Row>

        </div>

    )
}