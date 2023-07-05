import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { TeaType, UserRef} from '../ts/interfaces';

export default function TeaInfo() {
    const [tea, setTea] = React.useState<TeaType>();
    const [user, setUser] = React.useState<UserRef>();
    const [userList, setUserList] = React.useState<UserRef[]>();

    const pathID = useLocation().pathname;

    async function getTeaInfo() {
        const response = await fetch(`http://localhost:9000${pathID}`);
        const json = await response.json();
    
        if(response.ok) {
          setTea(json);
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
        getUser();
    }, []);

    React.useEffect(() => {
        getUserList();
    }, []);

    const userListElements = userList?.map((rec_user) => {
        return (
            <option value={rec_user._id}>{rec_user.username}</option>
        )
    });

    // TODO: RECOMMENDER/recommended by IS NOT SENDING TO CONTROLLER 
    // PROBLEM IS _ID IS NOT ACCESSIBLE
    return (
        <div>
            <Navbar />
            <p>Tea name: {tea ? tea.tea_name : ""}</p>
            <p>Type: {tea ? tea.type : ""}</p>
            <p>Brand: {tea ? tea.brand : ""}</p>
            <p>Rating: {tea ? tea.rating : ""}</p>
            {/* <p>Added by User on </p> */}
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
                                    <input type="hidden" id="recommendedtea" name="recommendedtea" value={tea?._id}></input>
                                    <input type="text" id="recommendedteaname" name="recommendedteaname" disabled value={tea?.tea_name}></input>
                                    {/* <input type="hidden" name="currentuser" id="currentuser" value={user?.username}></input> */}
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
        </div>
    )
}