import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const { dispatch } = useAuthContext();

    const login = async (username: string, password: string) => {
        const response = await fetch("https://tea-share-production.up.railway.app/auth/login", {
            method: "POST",      
            credentials: "include",
            body: JSON.stringify({username, password}),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const json = await response.json();

        if(response.ok) {
            const userJSON = {user: json.username};
            localStorage.setItem("user", JSON.stringify(userJSON));
            dispatch({type: "LOGIN", payload: userJSON})
        }
    }

    return login;
}