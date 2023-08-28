import { TeaType, UserType } from "../ts/interfaces";


export const cleanString = (string: string) => {
    return string.replace("&#x27;", "'").replace("&amp;", "&");
}

export async function handlePost(url: string) {
    const response = await fetch(url, {method: "POST", credentials: "include"});
    const json = await response.json();
    return json;
}

export const isFavorited = (teaID: string, user: UserType ) => {
    const teaIDs = user.user.favorite_teas.map((tea: TeaType) => {
        return tea._id;
    });
    return teaIDs.includes(teaID);
}

export const isSaved = (teaID: string, user: UserType ) => {
    const teaIDs = user.user.saved_teas.map((tea: TeaType) => {
        return tea._id;
    });
    return teaIDs.includes(teaID);
}
