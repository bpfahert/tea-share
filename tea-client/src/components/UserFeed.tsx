import React from 'react';
import Navbar from './Navbar';
import TeaList from './TeaList';
import { TeaType, UserType } from '../ts/interfaces';

export default function UserFeed() {

    const [user, setUser] = React.useState<UserType>();
    const [allTeas, setAllTeas] = React.useState([]);

    async function getUser() {
        const response = await fetch('http://localhost:9000/user/getuser', {
            credentials: 'include',
        });
        const json = await response.json();

        if(response.ok) {
            setUser(json);
        }
    }

    async function getAllTeas() {
        const response = await fetch(`http://localhost:9000/teas/all`);
        const json = await response.json();
    
        if(response.ok) {
          setAllTeas(json);
        }
        
    }

    React.useEffect(() => {
        getAllTeas();
    }, []);

    React.useEffect(() => {
        getUser();
    }, []);

    const recommended_teas = null;
    const saved_teas = null;
    const favorite_teas = null;
    const user_teas = null;
    const top_teas = null;

    return (
        <div>
            <Navbar />
            <div className="testdiv">
                <h3>All: </h3>
                <TeaList tealist={allTeas} listname={"all teas"}/>
            </div>
            <div className="friendactivitydiv">
                <h3>Teas recently added by friends: </h3>
                <TeaList tealist={allTeas} listname={"Friends activity"}/>
            </div>
            <div className="recommendedteas">
                <h3>Recommended Teas</h3>
                {recommended_teas ? 
                    <TeaList tealist={allTeas} listname={"Teas recommended by friends"} />
                    : <p>You have no recommendations currently.</p>
                }
            </div>
            <div className="savedteas">
                <h3>Saved Teas</h3>
                {saved_teas ? 
                    <TeaList tealist={allTeas} listname={"Saved teas"} />
                    : <p>You have no saved teas.</p>
                }
            </div>
            <div className="favoriteteas">
                <h3>Favorite Teas</h3>
                {favorite_teas ? 
                    <TeaList tealist={allTeas} listname={"Favorite teas"} />
                    : <p>You have no favorited teas.</p>
                }
            </div>
            <div className="yourteas">
                <h3>Teas added by you</h3>
                {user_teas ? 
                    <TeaList tealist={allTeas} listname={"Your teas"} />
                    : <p>You have no favorited teas.</p>
                }
            </div>
            <div className="topteas">
                <h3>Top teas</h3>
                {top_teas ? 
                    <TeaList tealist={allTeas} listname={"Top rated teas"} />
                    : <p>You have no favorited teas.</p>
                }
            </div>
        </div>
    )
}
