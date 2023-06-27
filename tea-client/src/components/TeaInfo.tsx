import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { TeaType, UserType } from '../ts/interfaces';

export default function TeaInfo() {
    const [tea, setTea] = React.useState<TeaType>();
    const [user, setUser] = React.useState<UserType>();
    const [userList, setUserList] = React.useState();

    const pathID = useLocation().pathname;

    async function getTeaInfo() {
        const response = await fetch(`http://localhost:9000${pathID}`);
        const json = await response.json();
    
        if(response.ok) {
          setTea(json);
          console.log(tea);
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

    
    return (
        <div>
            <Navbar />
            <button onClick={() => console.log(userList)}>Test</button>
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
                                <form method="POST" action="/teas/recommend" className="teaform" id="recommendationform">
                                    <h4>Recommend this Tea</h4>
                                    <input type="hidden" id="recommendedtea" name="recommendedtea" value="TeaID"></input>
                                    <input type="text" id="recommendedtea" name="recommendedtea" disabled value="tea name"></input>
                                    <input type="hidden" name="recommender" id="recommender" value="User"></input>
                                    <select id="user" name="user">
                                    <option value="Username">Username</option>
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