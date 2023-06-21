import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TeaCard from './TeaCard';
import { TeaType } from '../ts/interfaces';

const testTea: TeaType = {
        tea_name: "Test Tea",
        type: "Green",
        brand: "David's Tea",
        rating: 9,
        notes: "Notes on the tea will go here",

}

describe('TeaCard component', () => {
    it('renders Tea name correctly', () => {
        render(<TeaCard tea={ testTea }/>);
        expect(screen.getByTestId('teacardtest')).toHaveTextContent('Test Tea');
    })

})