import Navbar from "./Navbar";

export default function Signup() {

    return (
        <div>
            <Navbar />
            <h2>Sign up for an account!</h2>
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