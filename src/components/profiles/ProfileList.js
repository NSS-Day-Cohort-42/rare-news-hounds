import { ProfileContext } from "./ProfileProvider";
import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import ProfileStatusToggle from "./ProfileStatusToggle";

export const ProfileList = (props) => {
  const { profiles, getProfiles } = useContext(ProfileContext);

  useEffect(() => {
    getProfiles();
  }, []);

  const alphabeticalUsers = profiles.sort((userId1, userId2) => {
    return userId1.username.localeCompare(userId2.username);
  })

  return (
    <Table striped bordered hover size="sm" className="userProfileContainer">
      <tbody>
        {alphabeticalUsers.map((profile) => {
          const isStaff = profile.is_staff;
          return (
            <tr>
              <td>{profile.username}</td>
              <td>
                {localStorage.getItem("is_admin") &&
                  <ProfileStatusToggle
                    isStaff={profile.is_staff}
                    userId={profile.id}
                  />
                }
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
