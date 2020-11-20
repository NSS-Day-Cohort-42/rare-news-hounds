import React, { useContext, useEffect, useState } from "react";
import { Row, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { PostContext } from "../posts/PostProvider";
import { ReactionContext } from "./ReactionProvider";
import "./reactions.css";

export default (props) => {
  const { postReactions, userReactions, postId, handleReaction } = props;
  const { reactions, getReactions } = useContext(ReactionContext);
  const { addReaction, deleteReaction } = useContext(PostContext);
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory();

  //map over all reactions; if a reaction is in the list of those that exist for this
  // post, build an object from the reaction properties, plus a count from that matching entry on the post itself;
  // otherwise build an object the same way, but where the count is 0
  const reactionsWithCount = reactions.map((r) => {
    const matchingPR = postReactions.find(
      (pr) => pr.reaction__label === r.label
    );
    if (matchingPR) {
      return {
        id: r.id,
        img: r.image_url,
        label: r.label,
        count: matchingPR.count,
      };
    } else return { id: r.id, img: r.image_url, label: r.label, count: 0 };
  });

  useEffect(() => {
    getReactions();
  }, []);

  // when a user clicks a reaction, if reactionValue is false, they're trying to delete,
  // so do that; otherwise they're tyring to add, so do that. then we have to re-fetch our post
  // and re-set it in PostDetail so it passes new accurate props to this component
  const handleReactionClick = (reactionValue, reactionId) => {
    if (reactionValue === false) {
      setSubmitting(true);
      addReaction(reactionId, postId).then(() => {
        setSubmitting(false);
        handleReaction(postId);
      });
    } else {
      setSubmitting(true);
      deleteReaction(reactionId, postId).then(() => {
        setSubmitting(false);
        handleReaction(postId);
      });
    }
  };

  return (
    <section className="reactions">
      {reactionsWithCount.map((r) => {
        // userReactions is an array of reactionIds for this post + user combo,
        //so the value of userHasReacted will tell the handler whether we
        //need to created or delete a postreaction
        const userHasReacted = userReactions.some((ur) => ur === r.id);

        return (
          <article className="reaction">
            <button
              disabled={submitting}
              className="reaction--image"
              onClick={() => handleReactionClick(userHasReacted, r.id)}
            >
              <Image src={r.img} />
            </button>
            <div className="reaction--count">{r.count}</div>
          </article>
        );
      })}
    </section>
  );
};
