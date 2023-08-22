import { ChangeEvent, FormEvent, useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function LoginForm() {
    const login = useLogin();

    const [ username, setUsername ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");

    const handleSubmit = async(e:FormEvent) => {
        e.preventDefault();
        await login(username, password);
    }

    return (
        <form method="POST" onSubmit={handleSubmit} className="loginform" id="loginform">
            <div className="row justify-content-center">
                <div className="form-group col-sm-12 mb-3 mt-2">
                    <div className="form-floating">
                        <input type="text" id="loginusername" className="form-control" name="username" required onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} value={username}></input>
                        <label htmlFor="username" className="form-label">Username</label>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="form-group col-lg-12 mb-3">
                    <div className="form-floating">
                        <input type="password" id="loginpassword" name="password" required className="form-control" onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} value={password}></input>
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