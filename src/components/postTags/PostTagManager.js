import React, { useState } from "react"
import { Button, Row } from "react-bootstrap"
import { PostTagForm } from "./PostTagForm"
import { PostTagList } from "./PostTagList"

export const PostTagManager = ({postId, isPostAuthor}) => {
	const [ isEditing, setIsEditing ] = useState(false)

	const endEditTags = () => setIsEditing(false)
	const startEditTags = () => setIsEditing(true)

	return (
		<>
		{
			isEditing 
			? <Row className="justify-content-center my-2">
          <PostTagForm endEditTags={endEditTags} postId={postId}/>
        </Row>
			: <>
        <Row className="justify-content-center my-2">
          <PostTagList postId={postId}/>
        </Row>
			{
			isPostAuthor
      ? <Row className="justify-content-center my-2">
          <Button 
            onClick={startEditTags} >
            Manage Tags
          </Button>
        </Row>
			: '' 
			}
			</>
		}
		</>
	)
}