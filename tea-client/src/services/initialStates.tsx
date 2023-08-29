import { UserType, TeaType } from "../ts/interfaces"

export const initialUserState : UserType = {
    user: {
        username: "",
        password: "",
        about: "",
        favorite_tea_type: "",
        email: "",
        favorite_teas: [],
        teas_added: [],
        saved_teas: [],
        recommended_teas: [],
        _id: "",
        notificationStatus: false,
    }
}

export const initialTeaState : TeaType = {
    tea_name: "",
    brand: "",
    type: "",
    rating: 0,
    notes: "",
    img: {
        data: "",
        contentType: "",
    },
    _id: "",
    created_on: "",
    created_by: {
        username: "",
        _id: ""
    }
}