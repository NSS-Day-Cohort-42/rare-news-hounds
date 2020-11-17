import { ProfileContext } from "./ProfileProvider";
import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import ProfileStatusToggle from "./ProfileStatusToggle";

export const ProfileList = (props) => {
  const { profiles, getProfiles } = useContext(ProfileContext);

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <Table striped bordered hover size="sm" className="userProfileContainer">
      <tbody>
        {profiles.map((profile) => {
          const isStaff = profile.is_staff;
          return (
            <tr>
              <td>{profile.username}</td>
              <td></td>
              <td>
                { localStorage.getItem("is_admin") &&
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
