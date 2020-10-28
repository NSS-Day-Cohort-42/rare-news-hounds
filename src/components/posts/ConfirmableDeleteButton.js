import React, { useState } from "react"
import Button from "react-bootstrap/Button"

/**
 * ConfirmableDeleteButton component - renders as a "Delete" button that, when clicked, requires the user to either confirm their deletion before actually deleting, or cancel their deletion.
 * 
 * Pass a function implementing whatever you want to happen when the user confirms deletion as props.onDelete.
 */
export const ConfirmableDeleteButton = props => {
  const [ isDeleting, setIsDeleting ] = useState(false)

  const handleConfirmDelete = () => {
    props.onDelete()
    setIsDeleting(false)
  }

  const renderInitialDeleteButton = () => (
    <Button variant="danger" onClick={() => setIsDeleting(true)}>
      Delete
    </Button>
  )

  const renderConfirmDeleteButtons = () => (
    <>
      <Button className="mr-1" variant="secondary" onClick={() => setIsDeleting(false)}>
        Cancel
      </Button>

      <Button variant="danger" onClick={handleConfirmDelete}>
        Confirm Delete
      </Button>
    </>
  )

  // this div includes a click handler that calls preventDefault on the event when clicked
  // this is because one context in which the ConfirmableDeleteButton is used is in the UserPostListItem, which
  // is rendered within a Link, and if the default event behavior was allowed, clicking on the delete button
  // in that context would cause the user to navigate to that Link's "to" prop
  return (
    <div className="confirmableDeleteButtonContainer d-flex justify-content-end mx-2" onClick={e => e.preventDefault()}>
      { isDeleting ? renderConfirmDeleteButtons() : renderInitialDeleteButton() }
    </div>
  )
}