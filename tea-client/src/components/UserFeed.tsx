import React from 'react';
import TeaList from './TeaList';
import { TeaRecType, UserType } from '../ts/interfaces';
import RecommendedTeaList from './RecommendedList';
import { initialUserState } from '../services/initialStates';

export default function UserFeed() {
    const [user, setUser] = React.useState<UserType>(initialUserState);
    const [newTeas, setNewTeas] = React.useState();

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

    //Filter out deleted tea recommendations
    const recommended_teas_elements = user?.user?.recommended_teas?.filter((recommendation : TeaRecType)=> {
        return recommendation.tea_rec !== null;
    })

    const new_teas = newTeas ? newTeas : [];
    const recommended_teas = user?.user?.recommended_teas ? recommended_teas_elements : [];
    const saved_teas = user?.user ? user.user.saved_teas : [];
    const favorite_teas = user?.user ? user.user.favorite_teas : [];
    const user_teas = user?.user ? user.user.teas_added : [];

    return (
        <div>
            <div className="recentactivitydiv">
                <TeaList tealist={new_teas} listname={"Recently added teas"} currentuser={user} listtype={"recent"}/>
            </div>
            <div className="recommendedteas">
                {recommended_teas ? 
                    <RecommendedTeaList tealist={recommended_teas} listname={"Teas recommended by friends"} currentuser={user} listtype={"recommended"}/>
                    : <p>You have no recommendations currently.</p>
                }
            </div>
            <div className="savedteas">
                {saved_teas ? 
                    <TeaList tealist={saved_teas} listname={"Saved teas"} currentuser={user} listtype={"saved"}/>
                    : <p>You have no saved teas.</p>
                }
            </div>
            <div className="favoriteteas">
                {favorite_teas ? 
                    <TeaList tealist={favorite_teas} listname={"Favorite teas"} currentuser={user} listtype={"favorite"}/>
                    : <p>You have no favorited teas.</p>
                }
            </div>
            <div className="yourteas">
                {user_teas ? 
                    <TeaList tealist={user_teas} listname={"Your teas"} currentuser={user} listtype={"added"}/>
                    : <p>You have no added teas.</p>
                }
            </div>
        </div>
    )
}
