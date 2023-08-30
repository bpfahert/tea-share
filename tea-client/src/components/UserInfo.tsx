import TeaList from "./TeaList";
import { UserType } from "../ts/interfaces";
import React from "react";
import { useLocation } from "react-router-dom";
import { initialUserState } from "../services/initialStates";

export default function UserInfo() {
    const [user, setUser] = React.useState<UserType>(initialUserState);
    const [userDetails, setUserDetails] = React.useState<UserType>();

    const pathID = useLocation().pathname;

    // Get logged in user info
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

    // Get user profile details
    React.useEffect(() => {
        async function getUserDetails() {
            const response = await fetch(`http://localhost:9000${pathID}`, {
                credentials: 'include',
            });
            const json = await response.json();
    
            if(response.ok) {
                setUserDetails(json);
            }
        }
        getUserDetails();

    }, []);

    return (
        <div>
            {user.username === "" ? 
            <div className="text-center">
                <h1>Please log in to see user info</h1> 
            </div> :
            <div>
                <p>Username: {userDetails?.username}</p>
                <p>Favorite type of tea: {userDetails?.favorite_tea_type}</p>
                { userDetails?.favorite_teas ? 
                <TeaList tealist={userDetails?.favorite_teas} listname={`${userDetails?.username}'s favorite teas`} currentuser={user}/> : 
                <p>{`${userDetails?.username} hasn't favorited any teas yet!`}</p>
                }
                { userDetails?.teas_added ? 
                <TeaList tealist={userDetails?.teas_added} listname={`${userDetails?.username}'s added teas`} currentuser={user}/> :
                <p>{`${userDetails?.username} hasn't added any teas yet!`}</p>
                } 
            </div>
            }
        </div>
    )
}