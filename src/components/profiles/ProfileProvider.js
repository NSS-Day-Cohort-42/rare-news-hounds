import React, { createContext, useState } from "react";
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

  const updateUserRole = (userId, isStaffUpdate) => {
    return fetch(`http://localhost:8000/profiles/${userId}/update_role`, {
      method: "PATCH",
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(isStaffUpdate),
    }).then(getProfiles);
  };

  return (
    <ProfileContext.Provider
      value={{
        getProfiles,
        profiles,
        updateUserRole,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};