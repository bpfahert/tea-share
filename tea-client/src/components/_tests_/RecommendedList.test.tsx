import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TeaType, UserType } from '../../ts/interfaces';
import { BrowserRouter } from 'react-router-dom';
import RecommendedTeaList from '../RecommendedList';


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

const testTea: TeaType = {
    tea_name: "Test Tea",
    type: "Green",
    brand: "David's Tea",
    rating: 9,
    notes: "Notes on the tea will go here",
    _id: "1",
    img: {data: "", contentType: ""},
    created_by: {
        username: "",
        _id: "",
    },
    created_on: "",

}

const secondTestTea: TeaType = {
    tea_name: "Other test Tea",
    type: "Herbal",
    brand: "David's Tea",
    rating: 5,
    notes: "Tea notes",
    _id: "3",
    img: {data: "", contentType: ""},
    created_by: {
        username: "",
        _id: "",
    },
    created_on: "",

}


const testList: TeaRecType[] = [
    {tea_rec: testTea, message: "test", recommended_by: testUser},
    {tea_rec: secondTestTea, message: "test 2", recommended_by: testUser},
];



describe('TeaListcomponent', () => {
    it('renders the list name properly', () => {
        render(<BrowserRouter> <RecommendedTeaList tealist={testList} listname="Test Recommended List" currentuser={testUser} listtype={"recommended_teas"}/> </BrowserRouter>);
        expect(screen.getByRole("heading", { name: "Test Recommended List"})).toHaveTextContent('Test Recommended List');
    })
})


export interface TeaRecType {
    message: string,
    tea_rec: TeaType,
    recommended_by: UserType,
}