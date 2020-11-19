import React from "react";

export default (props) => {
  const { postReactions } = props;

  return (
    <section>
      {postReactions.map((pr) => {
        return (
          <div>
            <article>{pr.reaction__label}</article>
            <article>{pr.count}</article>
          </div>
        );
      })}
    </section>
  );
};
