import React from 'react';
import TeaList from './TeaList';
import { TeaRecType, TeaType, UserType } from '../ts/interfaces';
import RecommendedTeaList from './RecommendedList';
import { initialUserState } from '../services/initialStates';
import { Link } from "react-router-dom";

export default function UserFeed() {
    const [user, setUser] = React.useState<UserType>(initialUserState);
    const [newTeas, setNewTeas] = React.useState([]);

    // Get user information
    React.useEffect(() => {
        async function getUser() {
            const response = await fetch('http://localhost:9000/user/getuser', {
                credentials: 'include',
            });
            const json = await response.json();
    
            if(response.ok) {
                setUser(json);
            }
        }
        getUser();
    }, []);

    // Get recently uploaded teas for New Teas array
    React.useEffect(() => {
        async function getNewTeas() {
            const response = await fetch('http://localhost:9000/teas/recent', {
                credentials: 'include',
            });
            const json = await response.json();
        
            if(response.ok) {
              setNewTeas(json);
            }
        }
        getNewTeas();
    }, []);

    // Return new teas as list items
    const activity_feed = newTeas.map((tea: TeaType) => {
        return (
            <li key={tea._id}>
                <Link style={{textDecoration: "none", color: "black", fontWeight:"bold"}} to={`/user/profile/${tea.created_by._id}`}>{tea.created_by.username}</Link> created a new {tea.type} tea called <Link style={{textDecoration: "none", color: "blue"}} to={`/teas/${tea._id}`}>{tea.tea_name}</Link>
            </li>
        )
    });

    //Filter out deleted tea recommendations
    const recommended_teas_elements = user?.recommended_teas?.filter((recommendation : TeaRecType)=> {
        return recommendation.tea_rec !== null;
    })

    const new_teas = newTeas ? newTeas : [];
    const recommended_teas = user?.recommended_teas ? recommended_teas_elements : [];
    const saved_teas = user ? user.saved_teas : [];
    const favorite_teas = user ? user.favorite_teas : [];
    const user_teas = user ? user.teas_added : [];

    return (
        <div className='text-center'>
            <ul className='activity feed'>
                {activity_feed}
            </ul>
            <div className="recentactivitydiv">
                <TeaList tealist={new_teas} listname={"Recently added teas"} currentuser={user} listtype={"recent"}/>
            </div>
            <div className="recommendedteas">
                <RecommendedTeaList tealist={recommended_teas} listname={"Teas recommended by friends"} currentuser={user} listtype={"recommended"}/>
            </div>
            <div className="savedteas">
                <TeaList tealist={saved_teas} listname={"Saved teas"} currentuser={user} listtype={"saved"}/>
            </div>
            <div className="favoriteteas">
                <TeaList tealist={favorite_teas} listname={"Favorite teas"} currentuser={user} listtype={"favorite"}/>
            </div>
            <div className="yourteas">
                <TeaList tealist={user_teas} listname={"Your teas"} currentuser={user} listtype={"added"}/>
            </div>
        </div>
    )
}
