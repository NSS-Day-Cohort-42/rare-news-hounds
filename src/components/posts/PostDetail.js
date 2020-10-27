import moment from "moment";
import React, { useContext, useState, useEffect } from "react";
import { Image, Badge } from "react-bootstrap";
import { ConfirmableDeleteButton } from "./ConfirmableDeleteButton";
import { PostContext } from "./PostProvider";
import { PostTagManager } from "../postTags/PostTagManager"
import EditPostButton from "./EditPostButton";
import "./PostDetail.css";

export default (props) => {
  const { getPostById, deletePost, getPosts } = useContext(PostContext);
  const [post, setPost] = useState({ category: {}, user: {} });
  const currentUser = parseInt(localStorage.getItem("rare_user_id"));
  const date = moment(post.publication_time + 86400000).format(
    "dddd, MMMM Do YYYY"
  );
  const handleDeleteButtonClick = () => {
    deletePost(post.id)
      .then(() => {
        getPosts();
      })
      .then(() => {
        props.history.goBack();
      });
  };

  useEffect(() => {
    const postId = parseInt(props.match.params.postId);
    getPostById(postId).then(setPost);
  }, []);

  return (
    <div className="postDetail">
      <div className="postDetail__header">
        <div className="postDetail__header--row"> 
          <div> 
            <p className="postDetail__title">{post.title}</p>
            <p className="postDetail__username">{post.user.username}</p>
          </div>
          <div className="postDetail__authorOptions">
            {currentUser === post.user_id && (
              <>
              <ConfirmableDeleteButton onDelete={handleDeleteButtonClick} />
              <EditPostButton postId={post.id} />
              </>
            )}
          </div>
        </div>
        <div className="postDetail__header--row">
          <p className="postDetail__date">{date}</p>
          <p className="postDetail__category">
            <Badge variant="info">
              {post.category.name}
            </Badge>
          </p>
        </div>
      </div>
      <div className="postDetail__headerimage">
        <Image src={post.image} fluid />
      </div>
      <p className="postDetail__content">{post.content}</p>
			<PostTagManager postId={post.id} isPostAuthor={currentUser === post.user_id}/>
    </div>
  );
};
