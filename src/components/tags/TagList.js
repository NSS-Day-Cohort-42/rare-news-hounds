import React, { useContext, useEffect } from "react";
import { ListGroup, Row, Col, Button } from "react-bootstrap";

import Tag from "./Tag";
import { TagContext } from "./TagProvider";
import { ConfirmableDeleteButton } from "../posts/ConfirmableDeleteButton";
import { ConfirmableEditTagButton } from "./ConfirmableEditTagButton";

export default (props) => {
  const { tags, getTags, deleteTag} = useContext(TagContext);

  tags.sort((a, b) => {
    const nameA = a.label.toUpperCase();
    const nameB = b.label.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  useEffect(() => {
    getTags();
  }, []);

  const confirmDelete = (tagId) => {
    deleteTag(tagId);
  };

  return (
    <>
      <article className="tags">
        {tags.map((t) => (
          <Row key={t.id} className="align-items-center">
            <Col xs="3">
              <Row>
                <Col xs="6">
                  <ConfirmableEditTagButton tag={t} />
                </Col>
                <Col xs="6">
                  <ConfirmableDeleteButton 
                    prompt="Are you sure you want to delete this tag?"
                    onDelete={() => confirmDelete(t.id)} />
                </Col>
              </Row>
            </Col>

            <Col xs="9">
              <ListGroup>
                <ListGroup.Item className="mb-2">
                  <Row>
                    <Col className="mt-2">
                      <Tag tag={t} key={t.id} />
                    </Col>
                    <Col className="d-flex justify-content-end m-2">
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

        ))}
      </article>
    </>
  );
};
