import { Types } from "mongoose";



export interface TeaType {
    tea_name: string, 
    type: string, 
    brand: string,
    rating: number,
    notes: string,
    _id: string,
}

export interface TeaTypeImg {
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
}

export interface PropTeaType {
tea: {
    tea_name: string, 
    type: string, 
    brand: string,
    rating: number,
    notes: string,
    }   
}

export interface PropTeaList {
    tealist: TeaType[],
    listname: string,
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
