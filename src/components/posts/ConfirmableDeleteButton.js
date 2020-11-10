import React, { useState } from "react"
import { Modal, Button, Row } from "react-bootstrap"
import { MdDelete } from "react-icons/md"

import "./ConfirmableDeleteButton.css"

/**
 * ConfirmableDeleteButton component - renders as a "Delete" button that, when clicked, renders a react-bootstrap Modal prompting the user to confirm if they truly want to delete the thing.
 * 
 * PROPS:
 *  onDelete <function> - A function that implements whatever you want to happen when the user confirms delete
 *  prompt (optional) <String> - The text to display as the confirmation text in the modal. 
 *    default value (if nothing passed in props) is "Are you sure you want to delete this item?"
 */
export const ConfirmableDeleteButton = props => {
  const confirmDeletePrompt = props.prompt || "Are you sure you want to delete this item?"

  const [ isDeleting, setIsDeleting ] = useState(false)

  const handleConfirmDelete = () => {
    props.onDelete()
    setIsDeleting(false)
  }

  // this div includes a click handler that calls preventDefault on the event when clicked
  // this is because one context in which the ConfirmableDeleteButton is used is in the UserPostListItem, which
  // is rendered within a Link, and if the default event behavior was allowed, clicking on the delete button
  // in that context would cause the user to navigate to that Link's "to" prop
  return <>
    <div onClick={e => e.preventDefault()}>
        <Button className="border-0 bg-white text-dark" onClick={() => setIsDeleting(true)}>
          <MdDelete style={{ fontSize: '36px' }} />
        </Button>
    </div>

    <Modal show={isDeleting} onHide={() => setIsDeleting(false)} className="confirmableDeleteModal">
      <Modal.Dialog>
        <Modal.Title>Confirm Delete</Modal.Title>
        <Modal.Body>
          <Row>
            <p>{confirmDeletePrompt}</p>
          </Row>
          <Row>
            <Button className="mr-1" variant="secondary" onClick={() => setIsDeleting(false)}>
              Cancel
            </Button>

            <Button variant="danger" onClick={handleConfirmDelete}>
              Confirm Delete
            </Button>
          </Row>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  </>
}