import { useState, FormEvent } from "react"
import { useSignup } from "../hooks/useSignup"

export default function SignUpForm() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [favoriteTea, setFavoriteTea] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [about, setAbout] = useState<string>("");

    const signup = useSignup();


    // Signup the user with useSignup hook and prevent modal-close bug by reloading page
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        await signup(username, password, favoriteTea, email, about);
        window.location.reload();
    }

    return (
        <form method="POST" onSubmit={handleSubmit} className="userform" id="newuserform">
            <div className="row justify-content-center">
                <div className="form-group col-lg-12 mb-3">
                    <div className="form-floating">
                        <input type="text" id="username" className="form-control" name="username" required maxLength={15} onChange={(e) => setUsername(e.target.value)} value={username}></input>
                        <label htmlFor="username" className="form-label">Username</label>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="form-group col-lg-12 mb-3">
                    <div className="form-floating">
                        <input type="password" id="password" name="password" className="form-control" required minLength={3} maxLength={100} onChange={(e) => setPassword(e.target.value)} value={password}></input>
                        <label htmlFor="password" className="form-label">Password</label>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="form-group col-lg-12 mb-3">
                    <div className="form-floating">
                        <input type="email" id="email" className="form-control" name="email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="form-group col-lg-12 mb-3">
                    <div className="form-floating">
                        <select id="favoritetea" name="favoritetea" className="form-select" aria-label="favorite tea" onChange={(e) => setFavoriteTea(e.target.value)} value={favoriteTea}>
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
                        <textarea style={{height: "120px"}} id="about" className="form-control" name="about" maxLength={800} onChange={(e) => setAbout(e.target.value)} value={about}></textarea>
                        <label htmlFor="about">About me</label>
                    </div>
                </div>
            </div>
            <button className="btn btn-info" type="submit">Submit</button>
        </form>
    )
}