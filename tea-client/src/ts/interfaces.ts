export interface TeaType {
    tea_name: string, 
    type: string, 
    brand: string,
    rating: number,
    notes: string,
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

export interface CurrentUser {
    currentuser?: {
        username: string,
        url: string,
    }
}