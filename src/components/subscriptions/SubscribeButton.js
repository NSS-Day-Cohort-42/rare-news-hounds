import React, { useContext } from "react"
import { SubscribeContext } from "./SubscriptionsProvider";
import Button from 'react-bootstrap/Button';


export default (props) => {
    const { createSubscription, endSubscription } = useContext(SubscribeContext);
//When the Subscribe button is clicked the profile user ID is sent to the server to create a Subscription
    const handleSubmitSubscribeClick = (e)=> {
        e.preventDefault();
        const subscribeObject = {
            author_id: props.authorId
        }
        if (props.subscribed === true){
        endSubscription(subscribeObject).then(props.onUpdate)
        } else {
        createSubscription(subscribeObject).then(props.onUpdate)
        }
    }
    
    return (
        <Button className="d-block ml-auto my-2" type="submit" onClick={handleSubmitSubscribeClick}>
            {props.subscribed ? "Doggone" : "Tail" }
            </Button>

    )
}