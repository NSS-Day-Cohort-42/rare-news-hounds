import React from "react"

export const ApprovePostToggler = props => {
  const { postId, isApproved } = props;

  const handleToggleApproval = () => {
    
  }

  return (
    <input type="checkbox" 
      name="approve_post" 
      checked={isApproved}
      onClick={handleToggleApproval} />
  )
}