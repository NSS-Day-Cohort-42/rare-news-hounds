import React, { useState, createContext } from "react";

export const PostTagContext = createContext();

export const PostTagProvider = props => {
    const [thisPostTags, setPostTags] = useState([]);


    const getPostTagsByPostId = postId => {
        return fetch(`http://localhost:8088/post_tags?post_id=${postId}`)
            .then(res => res.json())
            .then(setPostTags);
    };

    const addPostTag = postTag => {
        return fetch("http://localhost:8088/post_tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postTag)
        })
            .then(getPostTagsByPostId)
    }

    const deletePostTag = (postTagId) => {
        return fetch(`http://localhost:8088/post_tags/${postTagId}`, {
            method: "DELETE"
        })
            .then(getPostTagsByPostId)
    }

    return (
        <PostTagContext.Provider
            value={{
                thisPostTags,
                getPostTagsByPostId, addPostTag, deletePostTag
            }}
        >
            {props.children}
        </PostTagContext.Provider>
    )
};