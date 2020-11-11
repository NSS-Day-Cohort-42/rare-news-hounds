import React, { useContext, useRef, useState } from "react";
import { Modal, Button, Row } from "react-bootstrap";
import { BsGearFill } from "react-icons/bs";
import "./ConfirmableEditCategoryButton.css";
import { CategoryContext } from "./CategoryProvider";

/**
 * ConfirmableEditCategoryButton component - renders as an "Edit" button that, when clicked, renders a react-bootstrap Modal prompting the user to edit their category and then confirm that they truly want to edit that category.
 *
 * PROPS:
 *  category <Object> - the category object, itself. Has a label and id property.
 *  prompt (optional) <String> - The text to display as the confirmation text in the modal.
 *    default value (if nothing passed in props) is "Are you sure you want to edit this item?"
 */
export const ConfirmableEditCategoryButton = (props) => {
  const { updateCategory, categories } = useContext(CategoryContext);
  const categoryNames = categories.map(c => c.label.toLowerCase())
  const labelRef = useRef("");

  const confirmEditPrompt = props.prompt || "Edit this Category";

  const [isEditing, setIsEditing] = useState(false);

  const handleConfirmUpdate = () => {
    if (!categoryNames.includes(labelRef.current.value.toLowerCase().trim()) && labelRef.current.value.trim().length) {
      updateCategory({ id: props.category.id, label: labelRef.current.value });
      setIsEditing(false);
    } else alert('please enter a valid category name')};

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
                defaultValue={props.category.label}
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