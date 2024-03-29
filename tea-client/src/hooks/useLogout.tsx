import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = async () => {
        const response = await fetch("https://tea-share-production.up.railway.app/auth/logout", {
            method: "GET",      
            credentials: "include",
        })
            localStorage.removeItem('user');

            dispatch({type: "LOGOUT"});
    }

    return logout;
}