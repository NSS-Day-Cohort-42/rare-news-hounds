import React, { useContext, useRef, useState } from "react";
import { Modal, Button, Row } from "react-bootstrap";
import { BsGearFill } from "react-icons/bs";
import "./ConfirmableEditTagButton.css";
import { TagContext } from "./TagProvider";

/**
 * ConfirmableEditTagButton component - renders as an "Edit" button that, when clicked, renders a react-bootstrap Modal prompting the user to edit their tag and then confirm that they truly want to edit that tag.
 *
 * PROPS:
 *  tag <Object> - the tag object, itself. Has a label and id property.
 *  prompt (optional) <String> - The text to display as the confirmation text in the modal.
 *    default value (if nothing passed in props) is "Are you sure you want to edit this item?"
 */
export const ConfirmableEditTagButton = (props) => {
  const { updateTag, tags } = useContext(TagContext);
  const tagNames = tags.map(t => t.label.toLowerCase())
  const labelRef = useRef("");

  const confirmEditPrompt = props.prompt || "Edit this Tag";

  const [isEditing, setIsEditing] = useState(false);

  const handleConfirmUpdate = () => {
    if (!tagNames.includes(labelRef.current.value.toLowerCase().trim()) && labelRef.current.value.trim().length) {
      updateTag({ id: props.tag.id, label: labelRef.current.value });
      setIsEditing(false);
    } else alert('please enter a valid tag name')};

  return (
    <>
      <div onClick={(e) => e.preventDefault()}>
        <Button
          className="border-0 bg-white text-dark"
          onClick={() => setIsEditing(true)}
        >
          <BsGearFill style={{ fontSize: "36px" }} />
        </Button>
      </div>
      <Modal
        show={isEditing}
        onHide={() => setIsEditing(false)}
        className="confirmableEditModal"
      >
        <Modal.Dialog>
          <Modal.Title>Confirm Update</Modal.Title>
          <Modal.Body>
            <Row>
              <p>{confirmEditPrompt}</p>
            </Row>
            <Row>
              <input
                type="text"
                name="label"
                ref={labelRef}
                defaultValue={props.tag.label}
              />
            </Row>
            <Row>
              <Button
                className="mr-1"
                variant="secondary"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>

              <Button variant="success" onClick={handleConfirmUpdate}>
                Confirm Update
              </Button>
            </Row>
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </>
  );
};
