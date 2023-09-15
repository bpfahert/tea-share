import { ActivityFeedType, TeaType } from "../ts/interfaces";
import { Link } from "react-router-dom";
import { cleanString } from "../services/teaFunctions";


export default function ActivityFeed({tealist}: ActivityFeedType) {

    // Return new teas as list items
    const activityFeedElements = tealist.map((tea: TeaType) => {
        return (
            <li className="list-group-item" key={tea._id}>
                <Link style={{textDecoration: "none", color: "black", fontWeight:"bold"}} to={`/user/profile/${tea.created_by._id}`}>{tea.created_by.username}</Link> added a new {tea.type} tea called <Link style={{textDecoration: "none", color: "blue"}} to={`/teas/${tea._id}`}>{cleanString(tea.tea_name)}</Link>
            </li>
        )
    });

    return (
        <div className="container-md d-flex justify-content-center">
            <ul className="list-group" style={{ border: "solid 2px black"}}>
                {activityFeedElements}
            </ul>
        </div>

    )
}