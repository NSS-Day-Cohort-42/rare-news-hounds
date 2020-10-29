import React, { useContext, useEffect } from "react";
import Tag from "./Tag";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import { TagContext } from "./TagProvider";
import { ListGroup, Button } from "react-bootstrap";
import { ConfirmableDeleteButton } from "../posts/ConfirmableDeleteButton";

export default (props) => {
  const { tags, getTags } = useContext(TagContext);

	tags.sort((a,b)=> {
		const nameA = a.name.toUpperCase();
		const nameB = b.name.toUpperCase();
		 if (nameA < nameB){
			 return -1
		 }
		 if (nameA > nameB) {
			 return 1
		 }
		 return 0
	 })

  useEffect(() => {
    getTags();
  }, []);

  return (
    <>
      <article>
        <h2 className="my-4 text-center">Existing Tags</h2>
          {tags.map((t) => (
						<ListGroup>
						<ListGroup.Item className="mb-2">
						<Row>
							<Col className="mt-2">
							<Tag tag={t} key={t.id} />
						</Col>
						<Col className="d-flex justify-content-end m-2">
							<ConfirmableDeleteButton onDelete={() => alert('delete not implemented')} />
							<Button>Edit</Button>
						</Col>
						</Row>
						</ListGroup.Item>
					</ListGroup>
          ))}
      </article>
    </>
  );
};
