import React, {useContext, useState} from "react"
import { ProfileContext } from "./ProfileProvider"

export default props => {
    const { userId, isStaff } = props
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { updateUserRole } = useContext(ProfileContext)
    
    const handleStatusToggle = e => {
        setIsSubmitting(true)
        const isStaffValue = e.target.value
        updateUserRole(userId, { "is_staff" : isStaffValue })
        .then(() => setIsSubmitting(false))
    }


    return (
        <>
            <label htmlFor="Author">Author</label>
            <input label="Author" id={`isAuthor-${userId}`} name={`toggle_user_${userId}_role`} type="radio" checked={!isStaff} onChange={handleStatusToggle} value="false" disabled={isSubmitting}/>
            <label htmlFor="Author">Admin</label>
            <input label="Admin" id={`isAdmin-${userId}`} name={`toggle_user_${userId}_role`} type="radio" checked={isStaff} onChange={handleStatusToggle} value="true" disabled={isSubmitting} />
        </>
    )
}