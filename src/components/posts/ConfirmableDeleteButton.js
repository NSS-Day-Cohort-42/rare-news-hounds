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

  /**
   * Depending on isDeleting state, either render:
   *  a) a single button that upon clicking will trigger isDeleting state to be set to true, or
   *  b) two buttons side-by-side, with one allowing the user to cancel (and thus set isDeleting to false), or confirm their deletion
   */
  const renderDeleteButtons = () => {
    if(isDeleting) {
      return <>
        <Button variant="secondary" onClick={() => setIsDeleting(false)}>
          Cancel
        </Button>

        <Button variant="danger" onClick={handleConfirmDelete}>
          Confirm Delete
        </Button>
      </>
    }

    else {
      return (
        <Button variant="danger" onClick={() => setIsDeleting(true)}>
          Delete
        </Button>
      )
    }
  }

  return (
    <div className="deleteButtonContainer">
      { renderDeleteButtons() }
    </div>
  )
}