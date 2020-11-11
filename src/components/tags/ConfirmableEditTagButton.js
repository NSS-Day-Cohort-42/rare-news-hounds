import React, { useContext, useState } from "react";
import { Modal, Button, Row } from "react-bootstrap";
import { MdCreate } from "react-icons/md";
import "../posts/ConfirmableDeleteButton.css";
import { TagContext } from "./TagProvider";

/**
 * ConfirmableEditTagButton component - renders as an "Edit" button that, when clicked, renders a react-bootstrap Modal prompting the user to edit their tag and then confirm that they truly want to edit that tag.
 *
 * PROPS:
 *  onUpdate <function> - A function that implements whatever you want to happen when the user confirms update
 *  prompt (optional) <String> - The text to display as the confirmation text in the modal.
 *    default value (if nothing passed in props) is "Are you sure you want to edit this item?"
 */
export const ConfirmableEditTagButton = (props) => {
  const {updateTag} = useContext(TagContext)

  const confirmEditPrompt =
    props.prompt || "Are you sure you want to update this item?";

  const [isEditing, setIsEditing] = useState(false);
  const [tag, setTag] = useState({ label: props.tag.label, id: props.tag.id });

  const handleControlledInputChange = (e) => {
    const newTag = Object.assign({}, tag);
    newTag[e.target.name] = e.target.value;
    setTag(newTag);
  };

  const handleConfirmUpdate = () => {
    updateTag(tag);
    setIsEditing(false);
  };

  // this div includes a click handler that calls preventDefault on the event when clicked
  // this is because one context in which the ConfirmableEditButton is used is in the UserPostListItem, which
  // is rendered within a Link, and if the default event behavior was allowed, clicking on the Edit button
  // in that context would cause the user to navigate to that Link's "to" prop
  return (
    <>
      <div onClick={(e) => e.preventDefault()}>
        <Button
          className="border-0 bg-white text-dark"
          onClick={() => setIsEditing(true)}
        >
          <MdCreate style={{ fontSize: "36px" }} />
        </Button>
      </div>
      {/* Need to change to className to confirmableEditModel */}
      <Modal
        show={isEditing}
        onHide={() => setIsEditing(false)}
        className="confirmableDeleteModal"
      >
        <Modal.Dialog>
          <Modal.Title>Confirm Update</Modal.Title>
          <Modal.Body>
            <Row>
              <p>{confirmEditPrompt}</p>
              <input
                type="text"
                name="label"
                value={tag.label}
                onChange={handleControlledInputChange}
              />
            </Row>
            <Row>
              <Button
                className="mr-1"
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>

              <Button variant="danger" onClick={handleConfirmUpdate}>
                Confirm Update
              </Button>
            </Row>
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </>
  );
};
