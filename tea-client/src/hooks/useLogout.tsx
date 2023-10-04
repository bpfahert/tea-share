import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = async () => {
        const response = await fetch("https://tea-share.onrender.com/auth/logout", {
            method: "GET",      
            credentials: "include",
        })
            localStorage.removeItem('user');

            dispatch({type: "LOGOUT"});
    }

    return logout;
}