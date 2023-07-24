import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TeaCard from './TeaCard';
import { TeaType, UserType } from '../ts/interfaces';

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

describe('TeaCard component', () => {
    it('renders Tea name correctly', () => {
        render(<TeaCard tea={ testTea } currentuser={testUser} />);
        expect(screen.getByTestId('teacardtest')).toHaveTextContent('Test Tea');
    })

})