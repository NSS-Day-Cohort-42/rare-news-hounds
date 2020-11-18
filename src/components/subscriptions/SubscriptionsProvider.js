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


    return (
        <SubscribeContext.Provider
        value={{
            createSubscription
        }}>
            {props.children}
        </SubscribeContext.Provider>
    );
};