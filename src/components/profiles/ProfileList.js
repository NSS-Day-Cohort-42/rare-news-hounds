import { ProfileContext } from "./ProfileProvider";
import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom"
import ProfileStatusToggle from "./ProfileStatusToggle";
import "./ProfileDetail.css"

export const ProfileList = (props) => {
  const { profiles, getProfiles } = useContext(ProfileContext);

  useEffect(() => {
    getProfiles();
  }, []);

  const alphabeticalUsers = profiles.sort((userId1, userId2) => {
    return userId1.username.localeCompare(userId2.username);
  })

  let counter = 0;
  profiles.forEach(user => {
    if (user.is_staff) {
      counter++
    }
  });
  return (
    <Table striped bordered hover size="sm" className="userProfileContainer">
      <tbody>
        {alphabeticalUsers.map((profile) => {
          const isStaff = profile.is_staff;
          return (
            <tr>
              <td><Link to={`/profiles/${profile.id}`}>{profile.username}</Link></td>

              <td>
                {localStorage.getItem("is_admin") &&
                  <ProfileStatusToggle

                    isStaff={profile.is_staff}
                    userId={profile.id}
                    canDeactivate={counter >=  2}
                  />
                }
              </td>
            </tr>
          );
        }
        )}
      </tbody>
    </Table>
  );
};
