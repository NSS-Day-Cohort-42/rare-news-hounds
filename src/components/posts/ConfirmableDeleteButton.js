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
      <Button variant="secondary" onClick={() => setIsDeleting(false)}>
        Cancel
      </Button>

      <Button variant="danger" onClick={handleConfirmDelete}>
        Confirm Delete
      </Button>
    </>
  )

  return (
    <div className="confirmableDeleteButtonContainer" onClick={e => e.preventDefault()}>
      { isDeleting ? renderConfirmDeleteButtons() : renderInitialDeleteButton() }
    </div>
  )
}