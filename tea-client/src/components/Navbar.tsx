import TeaForm from './TeaForm';
import React from 'react';
import { UserType } from '../ts/interfaces';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

export default function Navbar() {
    const [user, setUser] = React.useState<UserType>();
    const { userContext } = useAuthContext();

    const logout = useLogout();

    // Get user info


    React.useEffect(() => {
        async function getUser() {
            try {
                const response = await fetch('https://tea-share.onrender.com/user/getuser', {
                    credentials: 'include',
                });
                const json = await response.json();
        
                if(response.ok) {
                    setUser(json);
                }
            } catch (error) {
                console.error(error);
            }
        }
        if (userContext !== null) {
            getUser();
        }
    },[userContext]);

    // Log the user out on Logout button click
    async function handleLogout() {
        await logout();
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-light" style={{backgroundColor: "turquoise"}}>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsupportedcontent">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarsupportedcontent">
                <ul className="navbar-nav" style={{fontWeight: "600"}}>
                    {userContext !== null ? 
                    <li className="nav-item active"><Link className="nav-link" to="/">{user?.username}</Link></li> : 
                    <li className="nav-item"><Link className="nav-link" to="/">Tea Share</Link></li>
                    }
                    {userContext !== null && 
                    <li className="nav-item"><Link className="nav-link" to="/viewteas">Teas</Link></li>
                    }
                    {userContext !== null && 
                    <li className="nav-item"><Link className="nav-link" to="#" data-bs-toggle="modal" data-bs-target="#newteamodal">Add New Tea</Link></li>
                    }
                    <div className="modal fade" id="newteamodal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header text-centered">
                                    <h3>Add a new tea!</h3>
                                    <button className="btn-close" data-bs-dismiss="modal" aria-label='close' data-bs-target="#newteamodal"></button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <TeaForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {userContext !== null && 
                    <li className="nav-item"><Link className="nav-link" to={`/user/profile/${user?._id}`}>Profile</Link></li>
                    }
                    {userContext !== null && 
                    <li className="nav-item"><Link className="nav-link" to="/userlist">Friends</Link></li>
                    }
                    {userContext !== null && 
                    <li className="nav-item"><Link className="nav-link" to="#" onClick={handleLogout}>Log Out</Link></li>
                    }
                </ul>
            </div>
            <ul className="navbar-nav">
            {userContext && user?.notificationStatus && <li style={{justifySelf: "flex-end"}} className="nav-item"><Link className="nav-link" to="https://tea-share.onrender.com/user/clearnotifications">New recommendation!</Link></li>}
            </ul>
        </nav>

    )
}