import "@testing-library/jest-dom/extend-expect";
import { isFavorited, isSaved} from "../../services/teaFunctions";
import { UserType, TeaType } from "../../ts/interfaces";

const testUser : UserType = {
    username: "test",
    password: "",
    about: "",
    favorite_tea_type: "",
    email: "",
    favorite_teas: [],
    teas_added: [],
    saved_teas: [],
    recommended_teas: [],
    _id: "",
}

const testList: TeaType[] = [
    { tea_name: "Test Tea", type: "Green", brand: "David's Tea", rating: 9, notes: "A great tea!", _id: "100", img: {data: "", contentType: ""}, created_on: "", created_by: {username: testUser.username, _id: ""} },
    { tea_name: "Test Tea 2", type: "Herbal", brand: "David's Tea", rating: 7, notes: "A decent tea", _id: "30", img: {data: "", contentType: ""}, created_on: "", created_by: {username: testUser.username, _id: ""}}
]

const secondTestUser: UserType = {
    username: "test",
    password: "",
    about: "",
    favorite_tea_type: "",
    email: "",
    favorite_teas: testList,
    teas_added: [],
    saved_teas: testList,
    recommended_teas: [],
    _id: "",
}


describe('isFavorited function', () => {
    it("returns true if tea is in provided user's favorites list", () => {
        expect(isFavorited("100", secondTestUser)).toBe(true);

    })

    it("returns false if tea is not in user's favorites list", () => {
        expect(isFavorited("100", testUser)).toBe(false);
    })
})

describe('isSaved function', () => {
    it("returns true if tea is in provided tealist", () => {
        expect(isFavorited("30", secondTestUser)).toBe(true);

    })

    it("returns false if tea is not in provided tealist", () => {
        expect(isFavorited("100", testUser)).toBe(false);
    })
})