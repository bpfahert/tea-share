import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = async () => {
        const response = await fetch("http://localhost:9000/auth/logout", {
            method: "GET",      
            credentials: "include",
        })
            localStorage.removeItem('user');

            dispatch({type: "LOGOUT"});
    }

    return logout;
}