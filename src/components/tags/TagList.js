import React, { useContext, useEffect } from "react";
import Tag from "./Tag";
import { TagContext } from "./TagProvider";

export default (props) => {
  const { tags, getTags } = useContext(TagContext);

  useEffect(() => {
    getTags();
  }, []);

  return (
    <>
      <article>
        {tags.map((t) => (
          <Tag tag={t} key={t.id} />
        ))}
      </article>
    </>
  );
};
