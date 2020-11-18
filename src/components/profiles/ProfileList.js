import { ProfileContext } from "./ProfileProvider";
import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import ProfileStatusToggle from "./ProfileStatusToggle";
import ProfileActiveToggle from "./ProfileActiveToggle";

export const ProfileList = (props) => {
  const { profiles, getProfiles } = useContext(ProfileContext);

  useEffect(() => {
    getProfiles()
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
                {
                  localStorage.getItem("is_admin") &&
                  <>
                    <td>
                      <ProfileActiveToggle
                      isActive={profile.active}
                      userId={profile.id}
                      key={profile.id}
                      />
                    </td>
                    <td>
                      <ProfileStatusToggle
                      isStaff={profile.is_staff}
                      userId={profile.id}
                      isActive={profile.active}
                      />
                    </td>
                  </>
                }
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
