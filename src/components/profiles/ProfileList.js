import { ProfileContext } from "./ProfileProvider";
import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import ProfileStatusToggle from "./ProfileStatusToggle";

export const ProfileList = () => {
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
              <td>{profile.is_staff ? "YES STAFF" : "NOT STAFF"}</td>
              <td></td>
              <td>
                <ProfileStatusToggle
                  isStaff={profile.is_staff}
                  userId={profile.id}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
