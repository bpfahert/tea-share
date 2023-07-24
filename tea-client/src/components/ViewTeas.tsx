import { TeaType, UserType } from '../ts/interfaces';
import TeaList from './TeaList';
import React from 'react';

export default function ViewTeas() {

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
        const response = await fetch('http://localhost:9000/teas/all');
        const json = await response.json();
    
        if(response.ok) {
          setAllTeas(json);
        }
        
    }    
    React.useEffect(() => {
        getAllTeas();
        getUser();
        
    }, []);

    const green_tea_list = allTeas.filter((tea : TeaType) => tea.type === "Green");
    const black_tea_list = allTeas.filter((tea : TeaType) => tea.type === "Black");
    const herbal_tea_list = allTeas.filter((tea : TeaType) => tea.type === "Herbal");
    const white_tea_list = allTeas.filter((tea : TeaType) => tea.type === "White");
    const oolong_tea_list = allTeas.filter((tea : TeaType) => tea.type === "Oolong");

    return (
        <div>
            <TeaList tealist={allTeas} listname={"Recently added teas"} currentuser={user} />
            <TeaList tealist={green_tea_list} listname={"Green teas"} currentuser={user}/>
            <TeaList tealist={black_tea_list} listname={"Black teas"} currentuser={user}/>
            <TeaList tealist={herbal_tea_list} listname={"Herbal teas"} currentuser={user}/>
            <TeaList tealist={white_tea_list} listname={"White teas"} currentuser={user}/>
            <TeaList tealist={oolong_tea_list} listname={"Oolong teas"} currentuser={user}/>
        </div>
    )

}