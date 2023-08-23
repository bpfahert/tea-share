import React from "react"

export interface TeaType{
    tea_name: string, 
    type: string, 
    brand: string,
    rating: number,
    notes: string,
    img: {
        data: any,
        contentType: string,
    },
    _id: string,
    created_by: {
        username: string,
        _id: string,
    },
    created_on: string,
}

export interface PropTeaCardType {
    tea: {
        tea_name: string, 
        type: string, 
        brand: string,
        rating: number,
        notes: string,
        _id: string,
        img: {
            data: any,
            contentType: string,
        },
        },
    currentuser: UserType,  
    rec_message?: string,
    rec_user?: string,
    rec_id? :string,
}



export interface PropTeaList {
    tealist: TeaType[],
    listname: string,
    currentuser: UserType,
    recommender?: Recommender[],
    listtype?: string,
}

export interface PropTeaRecList {
    tealist: TeaRecType[],
    listname: string,
    currentuser: UserType,
    recommender?: Recommender[],
    listtype?: string,

}

export interface UserType {
    user: {
        username: string,
        password: string,
        about: string,
        favorite_tea_type: string,
        favorite_teas: [],
        email: string,
        saved_teas: [],
        recommended_teas: [],
        teas_added: [],
        _id: string,
        notificationStatus?: boolean,
    }
}

export interface UserRef {
    username: string,
    password: string,
    about: string,
    favorite_tea_type: string,
    favorite_teas: [],
    email: string,
    saved_teas: [],
    recommended_teas: [],
    teas_added: [],
    _id: string,
}

export interface UserListType {
    userlist: UserType[],
}

export interface CurrentUser {
    currentuser: {
        username: string,
        url: string
    }
}

export interface Recommender {
        recommender: string,
        message: string,
}


export interface TeaRecType {
    message: string,
    tea_rec: TeaType,
    recommended_by: UserRef,
}

export interface UserContextType {
    userContext: { user: string } | null,
}

export interface initalUserContext {
    userContext: UserContextType,
}

export interface UserContext {
    userContext: UserContextType | null,
    dispatch: React.Dispatch<any>,
}

export interface ContextLogin {
    type: "LOGIN";
    payload: UserContextType
}

export interface ContextLogout {
    type: "LOGOUT";
}

export type ContextActions = ContextLogin | ContextLogout;