import React, { useContext, useEffect, useState } from "react"
import { TagContext } from "../tags/TagProvider"
import { PostTagContext } from "./PostTagProvider"
import Badge from 'react-bootstrap/Badge'
import "./PostTagForm.css"

export const PostTagList = ({postId}) => {
    const { tags, getTags } = useContext(TagContext)
    const { getPostTagsByPostId } = useContext(PostTagContext)
    const [ thisPostTags, setThisPostTags ] = useState([]) 
		const [ selectedPostTags, setSelectedPostTags ] = useState([]) 
		
    useEffect( () => {
        getTags()
        getPostTagsByPostId(postId)
            .then(thisPostTagsInitial => {
                setThisPostTags(thisPostTagsInitial)
                setSelectedPostTags(thisPostTagsInitial.map(pt => pt.tag_id))
                debugger
            })
    }, [postId] )
    
    return (
        <>
            <div>
                {
                    thisPostTags.map( postTag => { 
                        return ( <Badge pill variant="primary">
                        {postTag.tag.name}
                      </Badge> )
                    })                  
                }
            </div>
        </> 
    )
}