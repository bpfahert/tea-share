import LoginForm from './LoginForm';
import TeaForm from './TeaForm';
import { CurrentUser } from '../ts/interfaces';

export default function Navbar( { currentuser }: CurrentUser) {

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "turquoise"}}>
            <div className="collapse navbar-collapse" id="navbarsupportedcontent">
                <ul className="navbar-nav">
                    {currentuser ? 
                    <li className="nav-item active"><a className="nav-link" href="/teas">{currentuser.username}</a></li> :
                    <li className="nav-item"><a className="nav-link" href="/createaccount">Sign up</a></li>
                    }
                    <li className="nav-item"><a className="nav-link" href="/viewteas">Teas</a></li>
                    <li className="nav-item"><a className="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#newteamodal">Add New Tea</a></li>
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
                    {currentuser ? 
                    <li className="nav-item"><a className="nav-link" href={currentuser.url}>Profile</a></li>:
                    <div>
                        <li className="nav-item"><a className="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginmodal">Log in</a></li>
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
                    <li className="nav-item"><a className="nav-link" href="/userlist">Friends</a></li>
                </ul>
            </div>
      </nav>
    )
}