import React, { useContext, useEffect } from "react"
import { Row } from "react-bootstrap"
import { ReactionContext } from "./ReactionProvider"

export default (props) => {
    const { reactions, getReactions } = useContext(ReactionContext)

    useEffect(() => {
        getReactions()
    }, [])
    
    return (
        <section className="reactions">
            {reactions.map((r) => {
                return <article className="reaction">
                    <div className="reaction--image"><img src={r.image_url}/></div>
                </article>
            })}
        </section>
    )
}