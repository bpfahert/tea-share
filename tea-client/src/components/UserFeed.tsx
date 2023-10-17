import React from 'react';
import TeaList from './TeaList';
import { TeaRecType, UserType } from '../ts/interfaces';
import RecommendedTeaList from './RecommendedList';
import { initialUserState } from '../services/initialStates';
import ActivityFeed from './ActivityFeed';

export default function UserFeed() {
    const [user, setUser] = React.useState<UserType>(initialUserState);
    const [newTeas, setNewTeas] = React.useState([]);

    // Get user information
    React.useEffect(() => {
        async function getUser() {
            const response = await fetch('https://tea-share-production.up.railway.app/user/getuser', {
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
            const response = await fetch('https://tea-share-production.up.railway.app/teas/recent', {
                credentials: 'include',
            });
            const json = await response.json();
        
            if(response.ok) {
              setNewTeas(json);
            }
        }
        getNewTeas();
    }, []);



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
        <div className='text-center mt-1'>
            <ActivityFeed tealist={new_teas}/>
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
