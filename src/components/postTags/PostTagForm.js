import React, { useContext, useEffect, useState } from "react"
import { TagContext } from "../tags/TagProvider"
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup"
import ToggleButton from "react-bootstrap/ToggleButton"
import { PostTagContext } from "./PostTagProvider"

/*
The post tag form should take in a post as a prop, and let users select which of the existing tags they want to apply. This form should work for editing and creating. When the form is submitted, any postTags that have been un-selected should be deleted, and an postTags that have been selected should be added.

    The post tag form should get the postTagsByPostId, and store them in an list of object called thisPostTags
    Existing PostTags should be given a property changeState="existing"
    When a user clicks on a tag that isn't in thisPostTags, it should be added, and given the changeState of "toCreate"
    When a user clicks to de-activate a tag, it should be given the state of "toDelete" or removed from the PostTags list, if it hasn't been created.
    When a user hits 'save' the "toCreate" postTags should be created, and the "toDelete" posts should be deleted.

*/


export const PostTagForm = ({postId}) => {
	const { tags, getTags } = useContext(TagContext)
	const { getPostTagsByPostId, addPostTag, deletePostTag } = useContext(PostTagContext)
	const [ thisPostTags, setThisPostTags ] = useState([]) 
	const [ selectedPostTags, setSelectedPostTags ] = useState([]) 

	const handleChange = (val) => {
		setSelectedPostTags(val)
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
			{/* TODO: Add a save button */}
			</div>
		</>
	)

}