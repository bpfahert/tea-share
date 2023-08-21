
export default function SignUpForm() {
    
    return (
        <form method="POST" action="http://localhost:9000/auth/create" className="userform" id="newuserform">
            <div className="row justify-content-center">
                <div className="form-group col-lg-12 mb-3">
                    <div className="form-floating">
                        <input type="text" id="username" className="form-control" name="username" required maxLength={15}></input>
                        <label htmlFor="username" className="form-label">Username</label>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="form-group col-lg-12 mb-3">
                    <div className="form-floating">
                        <input type="password" id="password" name="password" className="form-control" required minLength={3} maxLength={100}></input>
                        <label htmlFor="password" className="form-label">Password</label>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="form-group col-lg-12 mb-3">
                    <div className="form-floating">
                        <input type="email" id="email" className="form-control" name="email"></input>
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="form-group col-lg-12 mb-3">
                    <div className="form-floating">
                        <select id="favoritetea" name="favoritetea" className="form-select" aria-label="favorite tea">
                            <option value="Green">Green</option>
                            <option value="Black">Black</option>
                            <option value="Oolong">Oolong</option>
                            <option value="Herbal">Herbal</option>
                            <option value="White">White</option>
                        </select>
                        <label className="form-label" htmlFor="favoritetea">Favorite Type of Tea</label>
                    </div>

                </div>
            </div>
            <div className="row">
                <div className="form-group col-lg-12 mb-3">
                    <div className="form-floating">
                        <textarea style={{height: "120px"}} id="about" className="form-control" name="about" maxLength={800}></textarea>
                        <label htmlFor="about">About me</label>
                    </div>
                </div>
            </div>
            <button className="btn btn-info" type="submit">Submit</button>
        </form>
    )
}