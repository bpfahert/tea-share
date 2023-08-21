import TeaForm from './TeaForm';
import React from 'react';
import { UserType } from '../ts/interfaces';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [user, setUser] = React.useState<UserType>();

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
        getUser();
    },[]);

    return (
        <nav className="navbar navbar-expand-sm navbar-light" style={{backgroundColor: "turquoise"}}>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsupportedcontent">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarsupportedcontent">
                <ul className="navbar-nav">
                    {user?.user?.username !== undefined ? 
                    <li className="nav-item active"><Link className="nav-link" to="/home">{user?.user?.username}</Link></li> : 
                    <li className="nav-item"><Link className="nav-link" to="/">Sign up</Link></li>
                    }
                    {user?.user?.username !== undefined ? 
                    <li className="nav-item"><Link className="nav-link" to="/viewteas">Teas</Link></li> : ""
                    }
                    {user?.user?.username !== undefined ? 
                    <li className="nav-item"><Link className="nav-link" to="#" data-bs-toggle="modal" data-bs-target="#newteamodal">Add New Tea</Link></li> : ""
                    }
                    <div className="modal fade" id="newteamodal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header text-centered">
                                    <h3>Add a new tea!</h3>
                                    <button className="btn-close" data-bs-dismiss="modal" data-bs-target="#newteamodal"></button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <TeaForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {user?.user?.username !== undefined ? 
                    <li className="nav-item"><Link className="nav-link" to={`/user/profile/${user?.user?._id}`}>Profile</Link></li> : ""
                    }
                    {user?.user?.username !== undefined ? 
                    <li className="nav-item"><Link className="nav-link" to="/userlist">Friends</Link></li> : ""
                    }
                    {user?.user?.username !== undefined ? 
                    <li className="nav-item"><Link className="nav-link" to="http://localhost:9000/auth/logout">Log Out</Link></li> : ""
                    }
                </ul>
            </div>
            <ul className="navbar-nav">
            {user?.user?.notificationStatus ? <li style={{justifySelf: "flex-end"}} className="nav-item"><Link className="nav-link" to="http://localhost:9000/user/clearnotifications">New recommendation!</Link></li> : ""}
            </ul>
        </nav>

    )
}