import LoginForm from './LoginForm';
import TeaForm from './TeaForm';
import React from 'react';
import { useCookies } from 'react-cookie';
import { UserType } from '../ts/interfaces';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [user, setUser] = React.useState<UserType>();
    const [cookies, removeCookie] = useCookies<string>([]);

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

    return (
        <nav className="navbar navbar-expand-sm navbar-light" style={{backgroundColor: "turquoise"}}>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsupportedcontent">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarsupportedcontent">
                <ul className="navbar-nav">
                    {user?.user?.username !== undefined ? 
                    <li className="nav-item active"><Link className="nav-link" to="/">{user?.user?.username}</Link></li> : 
                    <li className="nav-item"><Link className="nav-link" to="/createaccount">Sign up</Link></li>
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
                    <li className="nav-item"><Link className="nav-link" to={`/user/profile/${user?.user?._id}`}>Profile</Link></li> : 
                    <div>
                        <li className="nav-item"><Link className="nav-link" to="#" data-bs-toggle="modal" data-bs-target="#loginmodal">Log In</Link></li>
                        <div className="modal fade" id="loginmodal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header text-centered">
                                        <h3>Log in to your account!</h3>
                                        <button className="btn-close" data-bs-dismiss="modal" data-bs-target="#loginmodal"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div>
                                            <LoginForm />
                                        </div>
                                    </div>
                                </div>
                            </div>                        
                        </div>
                    </div>
                    }
                    {user?.user?.username !== undefined ? 
                    <li className="nav-item"><Link className="nav-link" to="/userlist">Friends</Link></li> : ""
                    }
                    {user?.user?.username !== undefined ? 
                    <li className="nav-item"><Link className="nav-link" to="http://localhost:9000/user/logout">Log Out</Link></li> : ""
                    }
                </ul>
            </div>
            <ul className="navbar-nav">
            {user?.user?.notificationStatus ? <li style={{justifySelf: "flex-end"}} className="nav-item"><Link className="nav-link" to="http://localhost:9000/user/clearnotifications">New recommendation!</Link></li> : ""}
            </ul>
        </nav>

    )
}