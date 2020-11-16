
import { ProfileContext } from "./ProfileProvider"
import React, { useContext } from "react"
import { Col, Table, ToggleButton } from "react-bootstrap"

export const ProfileList = () => {
    return (
        <Table striped bordered hover size="sm" className="userProfileContainer">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>USER</td>
                    <td><ToggleButton type="checkbox"
                        variant="secondary"></ToggleButton></td>
                    <td><div>
                    </div><input type="radio" id="male" name="gender" value="male">
                        </input><br></br>
                        <input type="radio" id="male" name="gender" value="male"></input>
                    </td>
                </tr>
            </tbody>
        </Table>
    )
}