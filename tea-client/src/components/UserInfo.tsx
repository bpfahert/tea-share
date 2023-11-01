import TeaList from "./TeaList";
import { UserType } from "../ts/interfaces";
import React from "react";
import { useLocation } from "react-router-dom";
import { initialUserState } from "../services/initialStates";
import Loading from "./Loading";

export default function UserInfo() {
    const [user, setUser] = React.useState<UserType>(initialUserState);
    const [userDetails, setUserDetails] = React.useState<UserType>();
    const [isLoading, setIsLoading] = React.useState(false);

    const pathID = useLocation().pathname;

    // Get logged in user info
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

    // Get user profile details
    React.useEffect(() => {
        async function getUserDetails() {
            setIsLoading(true);
            const response = await fetch(`https://tea-share-production.up.railway.app${pathID}`, {
                credentials: 'include',
            });
            const json = await response.json();
    
            if(response.ok) {
                setUserDetails(json);
                setIsLoading(false);
            }
        }
        getUserDetails();

    }, []);

    return (
        <div className="text-center">
            {isLoading ? <Loading /> : 
            <div>
                <p>Username: {userDetails?.username}</p>
                <p>Favorite type of tea: {userDetails?.favorite_tea_type ? userDetails?.favorite_tea_type : "Unknown"}</p>
                { userDetails?.favorite_teas ? 
                <TeaList tealist={userDetails?.favorite_teas} listname={`${userDetails?.username}'s favorite teas`} currentuser={user} listtype={"favorite"}/> : 
                <p>{`${userDetails?.username} hasn't favorited any teas yet!`}</p>
                }
                { userDetails?.teas_added ? 
                <TeaList tealist={userDetails?.teas_added} listname={`${userDetails?.username}'s added teas`} currentuser={user} listtype={"added"}/> :
                <p>{`${userDetails?.username} hasn't added any teas yet!`}</p>
                }
            </div> 
            }
        </div>
    )
}