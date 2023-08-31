import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"

export default function Signup() {

    return (
        <div className="container">
            <h2>Sign up for an account or log in!</h2>
            <p>Welcome to tea share! This site is meant to help you keep track of teas you've tried and for recommending teas to others! Please make an account to log in. Passwords are encrypted, but it's still recommended to use a unique password for this site.</p>
            <div>
                <h3>Features:</h3>
                <ul>
                    <li>Keep track of teas you've tried and find new teas recommended by friends! Add your own or search through already added teas.</li>
                    <li>Favorite Teas: Add teas to your favorites list to show others what you like.</li>
                    <li>Saved Teas: Save teas to try later. These aren't visible to anyone else.</li>
                    <li>Recommend Teas: Recommend teas you think friends would enjoy. They'll see who sent the recommendation, along with any message you choose to include.</li>
                </ul>
            </div>
            <p></p>
            <div className="row justify-content-center mb-3">
                <div className="col-sm-4 formdiv border border-dark">
                    <LoginForm />
                </div>
            </div>
            <div className="row justify-content-center">
                    New user? 
                    <button data-bs-toggle="modal" data-bs-target="#signupmodal" className="btn btn-info btn-sm col-sm-2" type="button">Create an account!</button>
            </div>
            <div className="modal fade" id="signupmodal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-centered">
                            <h3>Sign up for an account!</h3>
                            <button className="btn-close" aria-label="close" data-bs-dismiss="modal" data-bs-target="#signupmodal"></button>
                        </div>
                        <div className="modal-body">
                            <SignUpForm />
                        </div>
                    </div>
                </div>                        
            </div>
        </div>
    )
}