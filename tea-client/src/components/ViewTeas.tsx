import { TeaType, UserType } from '../ts/interfaces';
import TeaList from './TeaList';
import Loading from './Loading';
import React, { FormEvent } from 'react';
import { initialUserState } from '../services/initialStates';
import { teaSearch } from '../services/teaFunctions';
import SearchResults from './SearchResults';

export default function ViewTeas() {
    const [user, setUser] = React.useState<UserType>(initialUserState);
    const [allTeas, setAllTeas] = React.useState<TeaType[]>([]);
    const [search, setSearch] = React.useState<string>("");
    const [searchTeas, setSearchTeas] = React.useState<TeaType[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    // Event handler functions for tea search
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSearchTeas(teaSearch(search, allTeas));
    }
    
    // Get user info
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

    // Get all teas in an array
    React.useEffect(() => {
        async function getAllTeas() {
            setIsLoading(true);
            const response = await fetch('https://tea-share-production.up.railway.app/teas/all', {
                credentials: 'include',
            });
            const json = await response.json();
        
            if(response.ok) {
              setAllTeas(json);
              setIsLoading(false);
            }
            
        }
        getAllTeas();

    }, []);
    
    function isEmpty(array: TeaType[]) {
        return array.length === 0;
    }

    const green_tea_list = allTeas.filter((tea : TeaType) => tea.type === "Green");
    const black_tea_list = allTeas.filter((tea : TeaType) => tea.type === "Black");
    const herbal_tea_list = allTeas.filter((tea : TeaType) => tea.type === "Herbal");
    const white_tea_list = allTeas.filter((tea : TeaType) => tea.type === "White");
    const oolong_tea_list = allTeas.filter((tea : TeaType) => tea.type === "Oolong");

    return (
        <div className='text-center'>
            {isLoading ? <Loading /> : 
            <div>
                <p></p>
                <form className="d-flex justify-content-center mb-5" onSubmit={handleSubmit}>
                    <input value={search} onChange={handleChange} type="text" id="searchbar" name="searchbar" placeholder="Search for teas"></input>
                </form>
                <SearchResults tealist={searchTeas} listname={"Search Results"} currentuser={user} listtype="searchresults"/>
                {isEmpty(searchTeas) && <p style={{textAlign: "center"}}> No teas found with that name. </p>}
                <TeaList tealist={green_tea_list} listname={"Green teas"} currentuser={user} listtype="green"/>
                <TeaList tealist={black_tea_list} listname={"Black teas"} currentuser={user} listtype="black"/>
                <TeaList tealist={herbal_tea_list} listname={"Herbal teas"} currentuser={user} listtype="herbal"/>
                <TeaList tealist={white_tea_list} listname={"White teas"} currentuser={user} listtype="white"/>
                <TeaList tealist={oolong_tea_list} listname={"Oolong teas"} currentuser={user} listtype="oolong"/>
                <TeaList tealist={allTeas} listname={"All teas"} currentuser={user} listtype="allteas"/>
            </div>
            }
        </div>
    )

}