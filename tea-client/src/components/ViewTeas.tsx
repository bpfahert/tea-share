import { TeaType, UserType } from '../ts/interfaces';
import TeaList from './TeaList';
import React, { FormEvent } from 'react';

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
    const [allTeas, setAllTeas] = React.useState<TeaType[]>([]);
    const [search, setSearch] = React.useState<string>("");
    const [searchTeas, setSearchTeas] = React.useState<TeaType[]>([]);

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

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSearchTeas(teaSearch(search));
    }
    
    React.useEffect(() => {
        getAllTeas();
        getUser();
        
    }, []);

    function teaSearch(input: string) {
        return allTeas.filter((tea: TeaType) => tea.tea_name.toLowerCase().includes(input.toLowerCase()));

    }

    function isEmpty(array: TeaType[]) {
        return array.length === 0;
    }

    const green_tea_list = allTeas.filter((tea : TeaType) => tea.type === "Green");
    const black_tea_list = allTeas.filter((tea : TeaType) => tea.type === "Black");
    const herbal_tea_list = allTeas.filter((tea : TeaType) => tea.type === "Herbal");
    const white_tea_list = allTeas.filter((tea : TeaType) => tea.type === "White");
    const oolong_tea_list = allTeas.filter((tea : TeaType) => tea.type === "Oolong");

    return (
        <div>
            <p></p>
            <form onSubmit={handleSubmit}>
                <input value={search} onChange={handleChange} style={{justifySelf: "center"}} type="text" id="searchbar" name="searchbar" placeholder="Search for teas"></input>
            </form>
            <TeaList tealist={searchTeas} listname={"Search Results"} currentuser={user}/>
            {isEmpty(searchTeas) ? <p style={{justifySelf: "center"}}> No teas found with that name. </p> : "" }
            <TeaList tealist={green_tea_list} listname={"Green teas"} currentuser={user}/>
            <TeaList tealist={black_tea_list} listname={"Black teas"} currentuser={user}/>
            <TeaList tealist={herbal_tea_list} listname={"Herbal teas"} currentuser={user}/>
            <TeaList tealist={white_tea_list} listname={"White teas"} currentuser={user}/>
            <TeaList tealist={oolong_tea_list} listname={"Oolong teas"} currentuser={user}/>
            <TeaList tealist={allTeas} listname={"All teas"} currentuser={user} />
        </div>
    )

}