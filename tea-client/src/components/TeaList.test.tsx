import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TeaList from './TeaList';
import { TeaType } from '../ts/interfaces';

const testList: TeaType[] = [
    { tea_name: "Test Tea", type: "Green", brand: "David's Tea", rating: 9, notes: "A great tea!", _id: "1" },
    { tea_name: "Test Tea 2", type: "Herbal", brand: "David's Tea", rating: 7, notes: "A decent tea", _id: "2"}
]

describe('TeaListcomponent', () => {
    it('renders the list name properly', () => {
        render(<TeaList tealist={testList} listname="Test List" />);
        expect(screen.getByRole("heading", { name: "Test List"})).toHaveTextContent('Test List');
    })
})