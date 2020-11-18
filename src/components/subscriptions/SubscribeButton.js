import React, { useContext, useEffect } from "react"
import { SubscribeContext } from "./SubscriptionsProvider";


export default () => {
    const { createSubscription } = useContext();
    
    const subscribe = ()=> {

    }
    return (
        <button onclick={e => {
            e.preventDefault()
            subscribe()
        }}>Subscribe</button>
    )
}