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
        {tags.map((t) => {
          const canEditAndDelete = localStorage.getItem('is_admin')

          return (
            <Row key={t.id} className="align-items-center">
              { canEditAndDelete &&
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
              }

              <Col xs={canEditAndDelete ? "9" : "12"}>
                <ListGroup>
                  <ListGroup.Item className="mb-2">
                    <Row>
                      <Col className="mt-2">
                        <h3>
                        <Tag tag={t} />
                        </h3>
                      </Col>
                      <Col className="d-flex justify-content-end m-2">
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          )}
        )}
      </article>
    </>
  );
};
