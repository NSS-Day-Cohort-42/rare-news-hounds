import React from "react";
import Badge from 'react-bootstrap/Badge'

export default ({ category }) => {
  return (
      <h3>
        <Badge pill variant="info" className="m-1">
          {category.name}
        </Badge> 
      </h3>
  );
};
