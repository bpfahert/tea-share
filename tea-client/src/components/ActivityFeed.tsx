import { ActivityFeedType, TeaType } from "../ts/interfaces";
import { Link } from "react-router-dom";


export default function ActivityFeed({tealist}: ActivityFeedType) {

    // Return new teas as list items
    const activity_feed = tealist.map((tea: TeaType) => {
        return (
            <li className="list-group-item" key={tea._id}>
                <Link style={{textDecoration: "none", color: "black", fontWeight:"bold"}} to={`/user/profile/${tea.created_by._id}`}>{tea.created_by.username}</Link> created a new {tea.type} tea called <Link style={{textDecoration: "none", color: "blue"}} to={`/teas/${tea._id}`}>{tea.tea_name}</Link>
            </li>
        )
    });

    return (
        <div className="container d-flex justify-content-center">
            <ul className="list-group" style={{ border: "solid 2px black", backgroundColor: "peachpuff"}}>
                {activity_feed}
            </ul>
        </div>

    )
}