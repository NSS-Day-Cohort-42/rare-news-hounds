import React from "react"
import { useHistory } from "react-router-dom"
import { Button } from "react-bootstrap"
import { BsGearFill } from "react-icons/bs"

export default (props) => {
    const history = useHistory()
   
    return (
        <Button className="border-0 bg-white text-dark"
          onClick={evt => {
            evt.preventDefault()
            history.push(`/posts/edit/${props.postId}`)   
        }}>
            <BsGearFill style={{ fontSize: '36px' }} />
        </Button>
    )
}