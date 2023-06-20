import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

export default function TeaInfo() {
    const [tea, setTea] = React.useState(null);

    const pathID = useLocation().pathname;

    async function getTeaInfo() {
        const response = await fetch(`http://localhost:9000${pathID}`);
        const json = await response.json();
    
        if(response.ok) {
          setTea(json);
          console.log(tea);
        }
        
      }
    
    React.useEffect(() => {
        if (pathID !== "/") {
            getTeaInfo();
        }
    }, []);

    return (
        <div>
            <Navbar />
            <p>Tea name: </p>
            <p>Type:</p>
            <p>Brand:</p>
            <p>Rating:</p>
            <p>Added by User on Date</p>
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