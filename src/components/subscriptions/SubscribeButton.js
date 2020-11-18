import React, { useContext } from "react"
import { SubscribeContext } from "./SubscriptionsProvider";
import Button from 'react-bootstrap/Button';


export default (props) => {
    const { createSubscription } = useContext(SubscribeContext);
    
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