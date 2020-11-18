import React, { createContext, useState } from "react";
export const ProfileContext = createContext();

export const ProfileProvider = (props) => {
  const [profiles, setProfiles] = useState([]);
  {localStorage.getItem("is_admin") &&
                  <ProfileStatusToggle

                    isStaff={profile.is_staff}
                    userId={profile.id}
                    canDeactivate={counter >=  2}
                  />
                }
    return fetch(`http://localhost:8000/profiles`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setProfiles);
  };

  const getProfileById = (profileId) => {
    return fetch(`http://localhost:8000/profiles/${profileId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_token")}`,
        "Content-Type": "application/json",
      }
    })
      .then((res) =>
        res.json()
      );
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

  const updateProfile = (userId, profileUpdate) => {
    return fetch(`http://localhost:8000/profiles/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileUpdate),
    }).then(getProfiles);
  };

  return (
    <ProfileContext.Provider
      value={{
        getProfiles,
        profiles,
        updateUserRole,
        updateProfile,
        getProfileById
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};
