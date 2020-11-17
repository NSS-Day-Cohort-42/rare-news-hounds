import React from "react";
import Badge from 'react-bootstrap/Badge'

export default ({ category }) => {
  return (
    <Badge pill variant="info" className="m-1" >
      {category.label}
    </Badge> 
  );
};
