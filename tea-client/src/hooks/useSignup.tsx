import { useAuthContext } from "./useAuthContext";

export const useSignup= () => {
    const { dispatch } = useAuthContext();

    const signup = async (username: string, password: string, favoritetea: string, email: string, about: string) => {
        const response = await fetch("https://tea-share.onrender.com/auth/signup", {
            method: "POST",      
            credentials: "include",
            body: JSON.stringify({username, password, favoritetea, email, about}),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const json = await response.json();

        if(response.ok) {
            localStorage.setItem("user", JSON.stringify(json));
            dispatch({type: "LOGIN", payload: json})
        }
    }

    return signup;
}