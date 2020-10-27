import React, { useContext, useEffect } from "react";
import Tag from "./Tag";
import Row from "react-bootstrap/Row";
import { TagContext } from "./TagProvider";

export default (props) => {
  const { tags, getTags } = useContext(TagContext);

  useEffect(() => {
    getTags();
  }, []);

  return (
    <>
      <article>
        <h2 className="my-4 text-center">Existing Tags</h2>
        <Row className="justify-content-center">
          {tags.map((t) => (
            <Tag tag={t} key={t.id} />
          ))}
        </Row>
      </article>
    </>
  );
};
