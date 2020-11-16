import React,  { createContext, useState } from 'react'
export const ProfileContext = createContext();

export const ProfileProvider = (props) => {
    
    const [profiles, setProfiles] = useState([]);

    const getProfiles = () => {
        return fetch(`http://localhost:8000/profiles`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_token")}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(setProfiles);
    };

    return (
        <ProfileContext.Provider
            value={{
                ProfileContext, getProfiles, profiles

            }}
        >
            {props.children}
        </ProfileContext.Provider>
    );
}