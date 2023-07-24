import React from 'react';
import TeaList from './TeaList';
import { TeaRecType, TeaType, UserType } from '../ts/interfaces';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';



export default function UserFeed() {

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
    const [allTeas, setAllTeas] = React.useState([]);
    const [cookies, removeCookie] = useCookies<string>([]);

    const navigate = useNavigate();

    React.useEffect(() => {
      const verifyCookie = async () => {
        if (!cookies.token) {
          navigate("/createaccount");
        }
        const response = await fetch('http://localhost:9000/user/getuser', {
            credentials: 'include',
        });
        const json = await response.json();
        if(response.ok) {
            setUser(json);
        }
      };
      verifyCookie();
    }, [cookies, navigate, removeCookie]);




    async function getAllTeas() {
        const response = await fetch('http://localhost:9000/teas/all');
        const json = await response.json();
    
        if(response.ok) {
          setAllTeas(json);
        }
        
    }

    React.useEffect(() => {
        getAllTeas();
        
    }, []);

    //Get recommended teas into array for tealist
    const recommended_teas_elements = user?.user?.recommended_teas?.map((recommendation : TeaRecType)=> {
        return recommendation.tea_rec;
    })

    const recommended_teas = user?.user?.recommended_teas ? recommended_teas_elements : [];
    const saved_teas = user?.user ? user.user.saved_teas : allTeas;
    const favorite_teas = user?.user ? user.user.favorite_teas : allTeas;
    const user_teas = user?.user ? user.user.teas_added : allTeas;
    const top_teas = null;

    return (
        <div>
            <div className="friendactivitydiv">
                <h3>Teas recently added by friends: </h3>
                <TeaList tealist={allTeas} listname={"Friends activity"} currentuser={user}/>
            </div>
            <div className="recommendedteas">
                <h3>Recommended Teas</h3>
                {recommended_teas ? 
                    <TeaList tealist={recommended_teas} listname={"Teas recommended by friends"} currentuser={user}/>
                    : <p>You have no recommendations currently.</p>
                }
            </div>
            <div className="savedteas">
                <h3>Saved Teas</h3>
                {saved_teas ? 
                    <TeaList tealist={saved_teas} listname={"Saved teas"} currentuser={user}/>
                    : <p>You have no saved teas.</p>
                }
            </div>
            <div className="favoriteteas">
                <h3>Favorite Teas</h3>
                {favorite_teas ? 
                    <TeaList tealist={favorite_teas} listname={"Favorite teas"} currentuser={user}/>
                    : <p>You have no favorited teas.</p>
                }
            </div>
            <div className="yourteas">
                <h3>Teas added by you</h3>
                {user_teas ? 
                    <TeaList tealist={user_teas} listname={"Your teas"} currentuser={user} />
                    : <p>You have no favorited teas.</p>
                }
            </div>
            <div className="topteas">
                <h3>Top teas</h3>
                {top_teas ? 
                    <TeaList tealist={allTeas} listname={"Top rated teas"} currentuser={user}/>
                    : <p>You have no favorited teas.</p>
                }
            </div>
        </div>
    )
}
