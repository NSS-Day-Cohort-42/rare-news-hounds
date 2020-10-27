import React, { useContext, useEffect, useState } from "react"
import { TagContext } from "../tags/TagProvider"
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup"
import ToggleButton from "react-bootstrap/ToggleButton"
import { PostTagContext } from "./PostTagProvider"
import Button from "react-bootstrap/esm/Button"
import "./PostTagForm.css"

export const PostTagForm = ({postId, endEditTags}) => {
	const { tags, getTags } = useContext(TagContext)
	const { getPostTagsByPostId, addPostTag, deletePostTag } = useContext(PostTagContext)
	const [ thisPostTags, setThisPostTags ] = useState([]) 
	const [ selectedPostTags, setSelectedPostTags ] = useState([]) 

	const handleChange = (val) => {
		setSelectedPostTags(val)
	}

	const savePostTags = () => {
    // Iterate through the selected tag ids and save any tags that weren't initially selected.
    const addPostTagPromises = selectedPostTags
      .filter(selectedTagId => !thisPostTags.some(pt => pt.tag_id === selectedTagId))
      .map(selectedTagId => {
        const newPostTag = {
          post_id: postId,
          tag_id: selectedTagId
        };

        return addPostTag(newPostTag)
      })

    // Iterate through the post tags that were initially selected, and delete the ones that were removed.
    const deletePostTagPromises = thisPostTags
      .filter(pt => !selectedPostTags.some(selectedTagId => selectedTagId === pt.tag_id))
      .map(pt => deletePostTag(pt.id))

    const allPromises = [ ...addPostTagPromises, ...deletePostTagPromises ]
    Promise.all(allPromises)
      .then(endEditTags)
	}

	useEffect( () => {
		getTags()
		getPostTagsByPostId(postId)
			.then(thisPostTagsInitial => {
				setThisPostTags(thisPostTagsInitial)
				setSelectedPostTags(thisPostTagsInitial.map(pt => pt.tag_id))
			})
	}, [postId] )

	return (
		<>
			<div>
			<ToggleButtonGroup 
			type="checkbox" 
			value={selectedPostTags} 
			className="mb-2"
			onChange={handleChange}>
				{
					tags.map( tag => {
						return ( <ToggleButton value={tag.id} key={tag.id}>{tag.name}</ToggleButton> )
					})					
				}
			</ToggleButtonGroup>
				<div className='post_tag_controls'>
					<Button variant='secondary'
					onClick={endEditTags}
					>Cancel</Button>
					<Button onClick={savePostTags}>Save</Button>
				</div>
			</div>
		</>
	)

}