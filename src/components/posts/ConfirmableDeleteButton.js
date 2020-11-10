import React, { useState } from "react"
import { Modal, Button, Row } from "react-bootstrap"

import "./ConfirmableDeleteButton.css"

/**
 * ConfirmableDeleteButton component - renders as a "Delete" button that, when clicked, renders a react-bootstrap Modal prompting the user to confirm if they truly want to delete the thing.
 * 
 * Pass a function implementing whatever you want to happen when the user confirms deletion as props.onDelete.
 */
export const ConfirmableDeleteButton = props => {
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
    <div className="confirmableDeleteButtonContainer d-flex justify-content-end mx-2" onClick={e => e.preventDefault()}>
        <Button variant="danger" onClick={() => setIsDeleting(true)}>
          Delete
        </Button>
    </div>

    <Modal show={isDeleting} onHide={() => setIsDeleting(false)} className="confirmableDeleteModal">
      <Modal.Dialog>
        <Modal.Title>Confirm Delete</Modal.Title>
        <Modal.Body>
          <Row>
            <p>{props.prompt || "Are you sure you want to delete this item?"}</p>
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