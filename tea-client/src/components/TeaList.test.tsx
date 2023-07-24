import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TeaList from './TeaList';
import { TeaType, UserType } from '../ts/interfaces';

const testUser : UserType = {
    user: {
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
}

const testList: TeaType[] = [
    { tea_name: "Test Tea", type: "Green", brand: "David's Tea", rating: 9, notes: "A great tea!", _id: "1", img: {data: "", contentType: ""}, created_on: "", created_by: {username: testUser.user.username, _id: ""} },
    { tea_name: "Test Tea 2", type: "Herbal", brand: "David's Tea", rating: 7, notes: "A decent tea", _id: "2", img: {data: "", contentType: ""}, created_on: "", created_by: {username: testUser.user.username, _id: ""}}
]



describe('TeaListcomponent', () => {
    it('renders the list name properly', () => {
        render(<TeaList tealist={testList} listname="Test List" currentuser={testUser} />);
        expect(screen.getByRole("heading", { name: "Test List"})).toHaveTextContent('Test List');
    })
})