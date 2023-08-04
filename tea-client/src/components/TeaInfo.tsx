import React from "react";
import { redirect, useLocation } from "react-router-dom";
import { TeaType, UserRef, UserType} from '../ts/interfaces';
import { Buffer } from "buffer";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import EditTeaForm from "./EditTeaForm";

export default function TeaInfo() {
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
    const [user, setUser] = React.useState<UserType>(initialUserState);
    const [userList, setUserList] = React.useState<UserRef[]>();
    const [cookies, removeCookie] = useCookies<string>([]);

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
    
    React.useEffect(() => {
        if (pathID !== "/") {
            getTeaInfo();
        }
    }, []);

    React.useEffect(() => {
        getUserList();
    }, []);

    const userListElements = userList?.map((rec_user) => {
        if(rec_user.username !== user.user.username) {
            return (
                <option value={rec_user._id}>{rec_user.username}</option>
            )
        }
    });

    function isFavorited() {
        const tea_ids = user.user.favorite_teas.map((tea : TeaType) => {
            return tea._id;
        });
        return (tea_ids.includes(tea?._id));
    }

    function isSaved() {
        const tea_ids = user.user.saved_teas.map((tea : TeaType) => {
            return tea._id;
        });
        return (tea_ids.includes(tea?._id));
    }

    return (
        <div>
            <p>Tea name: {tea ? tea.tea_name : ""}</p>
            <p>Type: {tea ? tea.type : ""}</p>
            <p>Brand: {tea ? tea.brand : ""}</p>
            <p>Rating: {tea ? tea.rating : ""}</p>
            <p>Notes: {tea ? tea.notes : ""}</p>
            {tea?.img ? <img src={`data:image/${tea.img.contentType};base64, ${Buffer.from(tea.img.data).toString('base64')}`} /> : <p>There is no image for this tea.</p>}
            <p>Added by <a style={{textDecoration: "none", color: "black"}} href={`/user/profile/${tea?.created_by._id}`}>{tea?.created_by ? tea.created_by.username : "Unknown"}</a> on {tea?.created_on}</p>
            <p>{isFavorited() ? <span> This is one of your favorite teas <a referrerPolicy="no-referrer-when-downgrade" href={`http://localhost:9000/teas/unfavorite/${tea?._id}`}> Remove from favorites </a> </span> : <a referrerPolicy="no-referrer-when-downgrade" href={`http://localhost:9000/teas/favorite/${tea?._id}`}> Favorite this tea </a> } </p>
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
            {tea?.created_by._id == user.user._id ? 
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
                                    <EditTeaForm tea_name={tea.tea_name} type={tea.type} brand={tea.brand} img={tea.img} rating={tea.rating} notes={tea.notes} _id={tea._id} created_by={tea.created_by} created_on={tea.created_on} />
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