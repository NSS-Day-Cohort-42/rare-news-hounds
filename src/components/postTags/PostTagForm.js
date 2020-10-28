import React, { useContext, useEffect, useState } from "react"
import { TagContext } from "../tags/TagProvider"
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup"
import ToggleButton from "react-bootstrap/ToggleButton"
import { PostTagContext } from "./PostTagProvider"
import Button from "react-bootstrap/esm/Button"
import "./PostTagForm.css"
import { Badge } from "react-bootstrap"

export const PostTagForm = ({postId, endEditTags}) => {
	const { tags, getTags } = useContext(TagContext)
	const { getPostTagsByPostId, addPostTag, deletePostTag } = useContext(PostTagContext)
	const [ thisPostTags, setThisPostTags ] = useState([]) 
  const [ selectedPostTags, setSelectedPostTags ] = useState([]) 
  const [ isSubmitting, setIsSubmitting ] = useState(false)

	const handleChange = (changedTagId) => {
		let newSelectedPostTags = []
		//check if the tag is already in the list of selected tags
		if (selectedPostTags.some(tagId => tagId === changedTagId )) {
			// Remove the id of the tag from the list of selected tags
			newSelectedPostTags = selectedPostTags.filter(tagId => tagId !== changedTagId)
		}
		else {
			// Add the tag to the list of selected tags
			selectedPostTags.push(changedTagId)
			// Copy the selected tags array to a new variable so that state will update correctly
			newSelectedPostTags = selectedPostTags.slice()
		}
		// Set component state, which will cause the component to re-render
		setSelectedPostTags(newSelectedPostTags)
	}

	const savePostTags = () => {
    setIsSubmitting(true)

    // Filter down the currently-selected postTags in the form to only those that were not initially selected 
    const postTagsToAdd = selectedPostTags.filter(selectedTagId => !thisPostTags.some(pt => pt.tag_id === selectedTagId))

    // then call addPostTag for each of those, and store the resulting Promises in an array
    const addPostTagPromises = postTagsToAdd
      .map(selectedTagId => {
        const newPostTag = {
          post_id: postId,
          tag_id: selectedTagId
        };

        return addPostTag(newPostTag)
      })

    // Filter down the initial postTags to determine which ones are no longer selected (i.e., were "deselected" by the user)
    const postTagsToDelete = thisPostTags.filter(pt => !selectedPostTags.some(selectedTagId => selectedTagId === pt.tag_id))

    // then call deletePostTag for each of those, and store the resulting Promises in an array
    const deletePostTagPromises = postTagsToDelete
      .map(pt => deletePostTag(pt.id))

    // finally, combine the promises from the two arrays and, when all resolve, call "endEditTags" function
    const allPromises = [ ...addPostTagPromises, ...deletePostTagPromises ]
    Promise.all(allPromises)
      .then(() => setIsSubmitting(false))
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
			
				{
					tags.map( tag => {
						const tagSelected = selectedPostTags.some(tagId => tagId === tag.id)
						return ( 
						<Button 
						style={{margin:"0 10px"}}
						size='sm' 
						variant={ 
							tagSelected
							? 'primary'
							: 'secondary'
							}
							disabled={isSubmitting}
							key={tag.id}
							onClick={evt => handleChange(tag.id)}
						>
							{tag.name}
						</Button>)
					})					
				}
				<div className='post_tag_controls'>
					<Button variant='secondary'
            onClick={endEditTags}
						disabled={isSubmitting}
						>
							Cancel
						</Button>
					<Button onClick={savePostTags} disabled={isSubmitting}>Save</Button>
				</div>
			
		</>
	)

}