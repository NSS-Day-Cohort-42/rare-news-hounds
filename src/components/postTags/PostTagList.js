import React, { useContext, useEffect, useState } from "react";
import { TagContext } from "../tags/TagProvider";
import { PostTagContext } from "./PostTagProvider";
import Badge from "react-bootstrap/Badge";

export const PostTagList = ({ postId }) => {
  const { getPostTagsByPostId } = useContext(PostTagContext);
  const [thisPostTags, setThisPostTags] = useState([]);

  useEffect(() => {
    getPostTagsByPostId(postId).then((thisPostTagsInitial) => {
      setThisPostTags(thisPostTagsInitial);
    });
  }, [postId]);

  return (
    <>
      <div>
        {thisPostTags.map((postTag) => {
          return (
            <Badge pill variant="primary" className="mx-1" key={postTag.id}>
              {postTag.tag.label}
            </Badge>
          );
        })}
      </div>
    </>
  );
};
