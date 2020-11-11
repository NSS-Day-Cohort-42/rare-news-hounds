import React, { useContext, useEffect } from "react";
import { TagContext } from "../tags/TagProvider";
import Button from "react-bootstrap/esm/Button";

export const PostTagForm = ({selectedPostTags, onTogglePostTag}) => {
  const { tags, getTags } = useContext(TagContext);

  useEffect(() => {
    getTags();
  }, []);

  return (
    <>
      {tags.map((tag) => {
        const tagSelected = selectedPostTags.some((tagId) => tagId === tag.id);
        return (
          <Button
            className="m-2"
            size="sm"
            variant={tagSelected ? "primary" : "secondary"}
            key={tag.id}
            onClick={(evt) => onTogglePostTag(tag.id)}
          >
            {tag.label}
          </Button>
        );
      })}
    </>
  );
};
