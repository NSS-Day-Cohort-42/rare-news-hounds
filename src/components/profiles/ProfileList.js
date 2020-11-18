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

  return (
    <Table striped bordered hover size="sm" className="userProfileContainer">
      <tbody>
        {profiles.map((profile) => {
          const isStaff = profile.is_staff;
          return (
            <tr>
              <td><Link to={`/profiles/${profile.id}`}>{profile.username}</Link></td>
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
