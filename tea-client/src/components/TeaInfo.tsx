import React from "react";
import { useLocation, Link } from "react-router-dom";
import { TeaType, UserRef, UserType} from '../ts/interfaces';
import { Buffer } from "buffer";
import { cleanString, handlePost } from "../services/teaFunctions";
import EditTeaForm from "./EditTeaForm";
import moment from 'moment';

export default function TeaInfo() {


    let initialTeaState : TeaType = {
        tea_name: "",
        brand: "",
        type: "",
        rating: 0,
        notes: "",
        img: {
            data: "",
            contentType: "",
        },
        _id: "",
        created_on: "",
        created_by: {
            username: "",
            _id: ""
        }
    }

    const [tea, setTea] = React.useState<TeaType>(initialTeaState);
    const [user, setUser] = React.useState<UserType>();
    const [userList, setUserList] = React.useState<UserRef[]>();
    const [favoriteStatus, setFavoriteStatus] = React.useState<boolean>();
    const [saveStatus, setSaveStatus] = React.useState<boolean>();

    const pathID = useLocation().pathname;

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
        getUserList();
        if (pathID !== "/") {
            getTeaInfo();
        }
        getUser();
    }, []);

    React.useEffect(() => {
        setFavoriteStatus(isFavorited());
        setSaveStatus(isSaved());
    }, [user]);

    async function getTeaInfo() {
        const response = await fetch(`http://localhost:9000${pathID}`, {
            credentials: 'include',
        });
        const json = await response.json();
    
        if(response.ok) {
          setTea(json);
        }      
    }


    async function getUserList() {
        const response = await fetch('http://localhost:9000/user/userlist', {
            credentials: 'include',
        });
        const json = await response.json();

        if(response.ok) {
            setUserList(json);
        }
    }
    


    const userListElements = userList?.map((rec_user, index) => {
        if(rec_user.username !== user?.user.username) {
            return (
                <option value={rec_user._id} key={index}>{rec_user.username}</option>
            )
        }
    });


    // Favorite tea logic

    function isFavorited() {
        const tea_ids = user?.user.favorite_teas.map((favoriteTea : TeaType) => {
            return favoriteTea._id;
        });
        return (tea_ids?.includes(tea._id));
    }

    let displayFavoriteButton = favoriteStatus ? <span>This is one of your favorite teas <button onClick={() => handleFavorite()}>Remove from favorites</button></span> : <span><button onClick={() => handleFavorite()}>Favorite this tea</button></span>;

    async function handleFavorite() {
        if (user !== undefined) {
            if(favoriteStatus === true) {
                await handlePost(`http://localhost:9000/teas/unfavorite/${tea?._id}`);
                setFavoriteStatus(false);
            } else {
                await handlePost(`http://localhost:9000/teas/favorite/${tea?._id}`);
                setFavoriteStatus(true);
            }
        }
    }



    // Save tea logic
    function isSaved() {
        const tea_ids = user?.user.saved_teas.map((savedTea : TeaType) => {
            return savedTea._id;
        });
        return (tea_ids?.includes(tea._id));
    }

    let displaySaveButton = saveStatus ? <span>This is one of your saved teas <button onClick={() => handleSave()}>Remove from saved teas</button></span> : <span><button onClick={() => handleSave()}>Save this tea</button></span>;

    async function handleSave() {
        if (user !== undefined) {
            if(saveStatus === true) {
                await handlePost(`http://localhost:9000/teas/unsave/${tea?._id}`);
                setSaveStatus(false);
            } else {
                await handlePost(`http://localhost:9000/teas/save/${tea?._id}`);
                setSaveStatus(true);
            }
        }
    }
    

    return (
        <div className="text-center">
            <p>Tea name: {tea ? cleanString(tea.tea_name) : ""}</p>
            <p>Type: {tea ? tea.type : ""}</p>
            <p>Brand: {tea ? cleanString(tea.brand) : ""}</p>
            <p>Rating: {tea ? tea.rating : ""}</p>
            <p>Notes: {tea ? cleanString(tea.notes) : ""}</p>
                {tea?.img ? <img className="img-fluid" style={{maxWidth: "400px"}} src={`data:image/${tea.img.contentType};base64, ${Buffer.from(tea.img.data).toString('base64')}`} /> : <p>There is no image for this tea.</p>}
            <p>Added by <Link style={{textDecoration: "none", color: "black", fontWeight: "bold"}} to={`/user/profile/${tea?.created_by._id}`}>{tea?.created_by ? tea.created_by.username : "Unknown"}</Link> on {moment(tea?.created_on).format('MM/DD/YYYY HH:MM')}</p>
            <p>{displayFavoriteButton}</p>
            <p>{displaySaveButton}</p>
            <p></p>
            <a href="#" data-bs-toggle="modal" data-bs-target="#teamodal">Recommend this tea to a user</a>
            <div className="modal fade" id="teamodal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-centered">
                            <h3>Recommend this tea to a friend!</h3>
                            <button className="btn-close" data-bs-dismiss="modal" data-bs-target="#teamodal"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <form method="POST" action="http://localhost:9000/teas/recommend" className="teaform" id="recommendationform">
                                    <input type="hidden" id="currentuser" name="currentuser" value={user?.user._id || ""}></input>
                                    <input type="hidden" id="recommendedtea" name="recommendedtea" value={tea?._id}></input>
                                    <input type="hidden" id="recommendedteaname" name="recommendedteaname" disabled value={tea?.tea_name}></input>
                                    <select id="user" name="user">
                                        {userListElements}
                                    </select>
                                    <p>Enter a message here:</p>
                                    <input type="text" id="recmessage" name="recmessage"></input>
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p></p>
            {tea?.created_by._id == user?.user._id ? 
            <div>
                <a href="#" data-bs-toggle="modal" data-bs-target="#editmodal">Edit this tea</a>
                <div className="modal fade" id="editmodal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header text-centered">
                                <button className="btn-close" data-bs-dismiss="modal" data-bs-target="#editmodal"></button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <EditTeaForm tea_name={tea.tea_name.replace("&#x27;", "'")} type={tea.type} brand={tea.brand.replace("&#x27;", "'")} img={tea.img} rating={tea.rating} notes={tea.notes.replace("&#x27;", "'")} _id={tea._id} created_by={tea.created_by} created_on={tea.created_on} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p></p>
                <a href="#" data-bs-toggle="modal" data-bs-target="#deletemodal">Delete this tea</a>
                <div className="modal fade" id="deletemodal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header text-centered">
                                <button className="btn-close" data-bs-dismiss="modal" data-bs-target="#deletemodal"></button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <form method="POST" action={`http://localhost:9000/teas/delete/${tea?._id}`} className="teaform" id="deleteform">
                                        <h4>Permanently delete {tea?.tea_name}?</h4>
                                        <input type="hidden" id="currentuser" name="currentuser" value={user?.user._id}></input>
                                        <button type="submit">Delete</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : ""        
            }
        </div>
    )
}