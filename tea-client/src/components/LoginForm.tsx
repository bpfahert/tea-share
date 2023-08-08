
export default function LoginForm() {

    return (
        <form method="POST" action="http://localhost:9000/user/login" className="loginform" id="loginform">
            <div className="row justify-content-center">
                <div className="form-group col-sm-12 mb-3 mt-2">
                    <div className="form-floating">
                        <input type="text" id="username" className="form-control" name="username" required></input>
                        <label htmlFor="username" className="form-label">Username</label>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="form-group col-lg-12 mb-3">
                    <div className="form-floating">
                        <input type="password" id="password" name="password" required className="form-control"></input>
                        <label htmlFor="password" className="form-label">Password</label>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">         
                <button className="btn btn-info col-sm-4" type="submit">Log in</button>
            </div>
        </form>
    )
}