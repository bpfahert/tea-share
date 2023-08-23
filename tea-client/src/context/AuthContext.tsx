import { createContext, useReducer, useEffect } from 'react';
import { ContextActions, UserContext, UserContextType } from '../ts/interfaces';

export const initialState: UserContext = {
    userContext: null,
    dispatch: function noop() {},
}

export const AuthContext = createContext<UserContext>(initialState);


export const authReducer = (state: any, action: ContextActions) => {
    switch (action.type) {
        case 'LOGIN':
            console.log(state);
            return { userContext: action.payload };
        case 'LOGOUT':
            return { userContext: null };
        default: return state;
    }
}


export const AuthContextProvider = ({children} : {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const userJSON =  localStorage.getItem('user');
        const user = userJSON ? JSON.parse(userJSON) : null;

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