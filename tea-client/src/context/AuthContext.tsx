import { createContext, useReducer, useEffect } from 'react';
import { UserContextType } from '../ts/interfaces';

export const AuthContext = createContext();


export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { userContext: action.payload };
        case 'LOGOUT':
            return { userContext: null };
        default: return state;
    }
}


export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        userContext: null,
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if(user) {
            dispatch({type: 'LOGIN', payload: user});
        }
    },[])

    console.log('authcontext state:', state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}