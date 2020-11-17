import React, { useContext, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ProfileContext } from "./ProfileProvider";

export default (props) => {
  const { userId, isStaff } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const currentRareUserId = parseInt(localStorage.getItem("rare_user_id"));

  const { updateUserRole } = useContext(ProfileContext);

  const handleStatusToggle = (e) => {
    // check to see if current user (an admin) is choosing to demote themselves, and if so render a modal
    // prompting them to confirm; otherwise, toggle selected user's status
    if (currentRareUserId === userId && e.target.value === "false") {
      setShow(true);
    } else {
      setIsSubmitting(true);
      const isStaffValue = e.target.value;
      updateUserRole(userId, { is_staff: isStaffValue }).then(() =>
        setIsSubmitting(false)
      );
    }
  };

  //runs when a user (admin) confirms self-demotion; re-pushing the path to the profiles list is necessary to re-render
  // after removing the "is_admin" token
  const handleSelfNuke = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    updateUserRole(userId, { is_staff: "false" }).then(() => {
      setIsSubmitting(false);
      localStorage.removeItem("is_admin");
      history.push("/profiles");
    });
  };

  return (
    <>
          <label htmlFor="Author" style={{ paddingLeft: '10px', paddingRight: '5px'}}>Author</label>
      <input
        label="Author"
        id={`makeAuthor-${userId}`}
        name={`toggle_user_${userId}_role`}
        type="radio"
        checked={!isStaff}
        onChange={handleStatusToggle}
        value="false"
      />
      <label htmlFor="Admin" style={{ paddingLeft: '10px', paddingRight: '5px'}}>Admin</label>
      <input
        label="Admin"
        id={`makeAdmin-${userId}`}
        name={`toggle_user_${userId}_role`}
        type="radio"
        checked={isStaff}
        onChange={handleStatusToggle}
        value="true"
        disabled={isSubmitting}
      />
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Dialog>
          <Col>
            <Modal.Title>Confirm Status Change</Modal.Title>
            <Modal.Body>
              <Row>
                <p>
                  Warning: This action will remove all admin privileges for this
                  account. Are you sure you want to continue?
                </p>
              </Row>
              <Row>
                <Button
                  className="mr-1"
                  variant="secondary"
                  onClick={() => setShow(false)}
                >
                  Cancel
                </Button>

                <Button variant="danger" onClick={handleSelfNuke} value="false">
                  Confirm Account Change
                </Button>
              </Row>
            </Modal.Body>
          </Col>
        </Modal.Dialog>
      </Modal>
    </>
  );
};
