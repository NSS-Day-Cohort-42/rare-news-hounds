import React, { useContext, useState } from "react"
import { PostContext } from "./PostProvider"

/**
 * Component rendering as a checkbox that allows user to toggle the "approved" status of a post
 */
export const ApprovePostToggler = props => {
  const { postId, isApproved } = props;

  // state used to disable the input while submitting to avoid double-clicks
  const [ isSubmitting, setIsSubmitting ] = useState(false)

  const { updatePostApproval } = useContext(PostContext)

  const handleToggleApproval = () => {
    setIsSubmitting(true)
    const updatedIsApproved = !isApproved

    updatePostApproval(postId, updatedIsApproved)
      .then(() => setIsSubmitting(false))
  }

  return (
    <input type="checkbox" 
      disabled={isSubmitting}
      name="approve_post" 
      checked={isApproved}
      onChange={handleToggleApproval} />
  )
}