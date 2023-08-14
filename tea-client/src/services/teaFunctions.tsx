
export const cleanString = (string: string) => {
    return string.replace("&#x27;", "'").replace("&amp;", "&");
}
