export default function Signup() {

    return (
        <div>
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
            <div className="formdiv border border-dark w-50">
            <form method="POST" action="http://localhost:9000/user/create" className="userform" id="newuserform">
                <div className="row">
                    <div className="form-group col-lg-4">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" id="username" name="username" placeholder="Username" required maxLength={15}></input>
                    </div>
                    <div className="form-group col-lg-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" name="password" required minLength={3} maxLength={100}></input>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-lg-4">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email"></input>
                    </div>
                    <div className="form-group col-lg-4">
                        <label className="form-label" htmlFor="favoritetea">Favorite Type of Tea</label>
                        <select id="favoritetea" name="favoritetea">
                            <option value="Green">Green</option>
                            <option value="Black">Black</option>
                            <option value="Oolong">Oolong</option>
                            <option value="Herbal">Herbal</option>
                            <option value="White">White</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-lg-8">
                        <label htmlFor="about">About me</label>
                        <input type="about" id="about" name="about" maxLength={800}></input>
                    </div>
                </div>
                <button className="btn btn-info" type="submit">Submit</button>
            </form>
            </div>
        </div>
    )
}