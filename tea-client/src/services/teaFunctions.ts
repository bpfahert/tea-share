import { TeaType, UserType } from "../ts/interfaces";


export const cleanString = (string: string) => {
    return string.replace("&#x27;", "'").replace("&amp;", "&");
}

export async function handlePost(url: string) {
    const response = await fetch(url, {method: "POST", credentials: "include"});
    const json = await response.json();
    return json;
}