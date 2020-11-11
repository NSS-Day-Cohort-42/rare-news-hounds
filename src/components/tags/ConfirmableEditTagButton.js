import React, { useContext, useState } from "react";
import { Modal, Button, Row } from "react-bootstrap";
import { BsGearFill } from "react-icons/bs";
import "../posts/ConfirmableDeleteButton.css";
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
  const { updateTag } = useContext(TagContext);

  const confirmEditPrompt = props.prompt || "Edit this Tag";

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
            </Row>
            <Row>
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
                onClick={() => {
                  setIsEditing(false);
                }}
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
