import React, { useContext } from "react"
import { SubscribeContext } from "./SubscriptionsProvider";
import Button from 'react-bootstrap/Button';


export default (props) => {
    const { createSubscription } = useContext(SubscribeContext);
//When the Subscribe button is clicked the profile user ID is sent to the server to create a Subscription
    const handleSubmitSubscribeClick = (e)=> {
        e.preventDefault();
        const newSubscribeObject = {
            author_id: props.authorId
        }
        createSubscription(newSubscribeObject)
    }
    
    return (
        <Button className="d-block ml-auto my-2" type="submit" onClick={handleSubmitSubscribeClick}>Tail</Button>

    )
}