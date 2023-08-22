import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const { dispatch } = useAuthContext();

    const login = async (username: string, password: string) => {
        const response = await fetch("http://localhost:9000/auth/login", {
            method: "POST",      
            credentials: "include",
            body: JSON.stringify({username, password}),
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

    return login;
}