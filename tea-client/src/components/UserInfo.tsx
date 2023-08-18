import TeaList from "./TeaList";
import { TeaType, UserRef, UserType } from "../ts/interfaces";
import React from "react";
import { useLocation } from "react-router-dom";

export default function UserInfo() {

    let initialUserState : UserType = {
        user: {
            username: "",
            password: "",
            about: "",
            favorite_tea_type: "",
            email: "",
            favorite_teas: [],
            teas_added: [],
            saved_teas: [],
            recommended_teas: [],
            _id: "",
        }
    }

    const [user, setUser] = React.useState<UserType>(initialUserState);
    const [userDetails, setUserDetails] = React.useState<UserRef>();

    const pathID = useLocation().pathname;

    async function getUserDetails() {
        const response = await fetch(`http://localhost:9000${pathID}`, {
            credentials: 'include',
        });
        const json = await response.json();

        if(response.ok) {
            setUserDetails(json);
        }
    }


    async function getUser() {
        const response = await fetch('http://localhost:9000/user/getuser', {
            credentials: 'include',
        });
        const json = await response.json();

        if(response.ok) {
            setUser(json);
        }
    }

    React.useEffect(() => {
        getUserDetails();
        getUser();

    }, []);

    return (
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
    )
}