import React, { useContext, useEffect } from "react"
import { Row } from "react-bootstrap"
import { ReactionContext } from "./ReactionProvider"
import "./reactions.css"

export default (props) => {
    const { postReactions, userReactions, postId } = props
    const { reactions, getReactions } = useContext(ReactionContext)

    //map over all reactions; if a reaction is in the list of those that exist for this
    // post, build an object from the reaction properties, plus a count from that matching entry on the post itself;
    // otherwise build an object the same way, but where the count is 0
     const reactionsWithCount = reactions.map((r) => {
        const matchingPR = postReactions.find(pr => pr.reaction__label === r.label)
        if (matchingPR) {
            return {id: r.id, img: r.image_url, label: r.label, count: matchingPR.count}
        }
        else return {id: r.id, img: r.image_url, label: r.label, count: 0}
    })

    useEffect(() => {
        getReactions()
    }, [])

    const handleReactionClick = reactionValue => {
        if (reactionValue === true) {
            alert('DELETE IT')
        } else alert('ADD IT')

    }
    
    return (
        <section className="reactions">
            {reactionsWithCount.map((r) => {
                const userHasReacted = userReactions.some((ur) => ur === r.id)
                return <article className="reaction">
                    <div className="reaction--count">{r.count}</div>
                    <button className="reaction--image" onClick={ () => handleReactionClick(userHasReacted)} ><img src={r.img} /></button>
                </article>
            })}
        </section>
    )
}