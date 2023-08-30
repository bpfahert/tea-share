import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TeaCard from './TeaCard';
import { TeaType, UserType } from '../ts/interfaces';
import { BrowserRouter } from 'react-router-dom';

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

describe("TeaCard component", () => {
    it("renders Tea name correctly", () => {
        render(<BrowserRouter> <TeaCard tea={ testTea } currentuser={testUser} /> </BrowserRouter>);
        expect(screen.getByTestId('teacardnametest')).toHaveTextContent('Test Tea');
    })

    it("renders recommendation section when tea rec props are passed down", () => {
        render(<BrowserRouter> <TeaCard tea={ testTea } currentuser={testUser} rec_id={"1"} rec_user={testUser.username} rec_message={"test message"} /> </BrowserRouter>);
        expect(screen.getByTestId('teacardrecommendedtest')).toBeInTheDocument();
    })

    it("doesn't render recommendation section when tea props aren't passed down", () => {
        render(<BrowserRouter> <TeaCard tea={ testTea } currentuser={testUser} /> </BrowserRouter>);
        const removeRecButton = screen.queryByText('Recommended by');
        expect(removeRecButton).not.toBeInTheDocument();
    })

})