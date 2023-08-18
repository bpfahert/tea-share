import React from "react";
import { redirect, useLocation } from "react-router-dom";
import { TeaType, UserRef, UserType} from '../ts/interfaces';
import { Buffer } from "buffer";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
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
    const [cookies, removeCookie] = useCookies<string>([]);
    const [favoriteStatus, setFavoriteStatus] = React.useState<Boolean>();


    // NEED TO ADJUST LOADING ORDER - USE ASYNC/AWAIT? USER ISN'T LOADING IN TIME TO DISPLAY

    const pathID = useLocation().pathname;
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

    React.useEffect(() => {
        getUserList();
        if (pathID !== "/") {
            getTeaInfo();
        }
    }, []);

    React.useEffect(() => {
        setFavoriteStatus(isFavorited());
    }, [user]);

    async function getTeaInfo() {
        const response = await fetch(`http://localhost:9000${pathID}`);
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
    


    const userListElements = userList?.map((rec_user) => {
        if(rec_user.username !== user?.user.username) {
            return (
                <option value={rec_user._id}>{rec_user.username}</option>
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

    let displayFavoriteButton = favoriteStatus ? <span>This is one of your favorite teas <button onClick={() => setFavoriteStatus(false)}>Remove from favorites</button></span> : <span><button onClick={() => setFavoriteStatus(true)}>Favorite this tea</button></span>;

    React.useEffect(() => {
        if (user !== undefined) {
            if(favoriteStatus === true) {
                handlePost(`http://localhost:9000/teas/favorite/${tea?._id}`);
            } else {
                handlePost(`http://localhost:9000/teas/unfavorite/${tea?._id}`);
            }
        }
    },[favoriteStatus])



    // Save tea logic
    function isSaved() {
        const tea_ids = user?.user.saved_teas.map((savedTea : TeaType) => {
            return savedTea._id;
        });
        return (tea_ids?.includes(tea._id));
    }
    

    return (
        <div className="text-center">
            <button onClick={() => console.log(user)}>User</button>
            <button onClick={() => console.log(tea)}>tea</button>
            <p>Tea name: {tea ? cleanString(tea.tea_name) : ""}</p>
            <p>Type: {tea ? tea.type : ""}</p>
            <p>Brand: {tea ? cleanString(tea.brand) : ""}</p>
            <p>Rating: {tea ? tea.rating : ""}</p>
            <p>Notes: {tea ? cleanString(tea.notes) : ""}</p>
                {tea?.img ? <img className="img-fluid" style={{maxWidth: "400px"}} src={`data:image/${tea.img.contentType};base64, ${Buffer.from(tea.img.data).toString('base64')}`} /> : <p>There is no image for this tea.</p>}
            <p>Added by <a style={{textDecoration: "none", color: "black"}} href={`/user/profile/${tea?.created_by._id}`}>{tea?.created_by ? tea.created_by.username : "Unknown"}</a> on {moment(tea?.created_on).format('MM/DD/YYYY HH:MM')}</p>
            <p>{displayFavoriteButton}</p>
            <p>{isSaved() ? <span> This is one of your saved teas <a referrerPolicy="no-referrer-when-downgrade" href={`http://localhost:9000/teas/unsave/${tea?._id}`}> Remove from saved teas </a> </span> : <a referrerPolicy="no-referrer-when-downgrade" href={`http://localhost:9000/teas/save/${tea?._id}`}> Save this tea </a> } </p>
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
                                    <h4>Recommend this Tea</h4>
                                    <input type="hidden" id="currentuser" name="currentuser" value={user?.user._id}></input>
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