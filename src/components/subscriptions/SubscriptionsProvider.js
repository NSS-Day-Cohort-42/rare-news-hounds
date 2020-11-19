import React, { createContext } from 'react';
export const SubscribeContext = createContext();


export const SubscriptionProvider = (props) => {
    
    const createSubscription = (sub) => {
        return fetch (`http://localhost:8000/subscriptions`, {
            method: 'POST',
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_token")}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(sub)
        })
        .then((res)=> res.json())
    }
    const endSubscription = (sub) => {
        return fetch (`http://localhost:8000/subscriptions/end_subscription`, {
            method: 'PUT',
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_token")}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(sub)
        })
    }


    return (
        <SubscribeContext.Provider
        value={{
            createSubscription,
            endSubscription
        }}>
            {props.children}
        </SubscribeContext.Provider>
    );
};