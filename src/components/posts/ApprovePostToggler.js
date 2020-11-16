import React, { useContext, useState } from "react"
import { PostContext } from "./PostProvider"

export const ApprovePostToggler = props => {
  const { postId, isApproved } = props;

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
      onClick={handleToggleApproval} />
  )
}