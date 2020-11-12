import React from "react";
import Badge from "react-bootstrap/Badge";

export const PostTagList = ({ postTags }) => {

  return (
    <>
      <div>
        {postTags.map((postTag) => {
          return (
            <Badge pill variant="primary" className="mx-1" key={postTag.id}>
              {postTag.label}
            </Badge>
          );
        })}
      </div>
    </>
  );
};
