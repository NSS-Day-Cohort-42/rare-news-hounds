import React, { useContext, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ProfileContext } from "./ProfileProvider";

export default (props) => {
  const { userId, isActive } = props;

  console.log(isActive)



  return (
    <>
      <label htmlFor="Active" style={{ paddingLeft: '10px', paddingRight: '5px'}}>Active</label>
      <input
        label="Active"
        id={`makeActive-${userId}`}
        name={`toggle_user_${userId}_role`}
        type="checkbox"
        checked={isActive}
        onChange={() => {
          // TODO: Update state based on change
        }}
        value={isActive}
      />
    </>
  );
};
