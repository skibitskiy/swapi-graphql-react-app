import '@testing-library/jest-dom/extend-expect';
import { within } from '@testing-library/dom';
import React from 'react';
import * as test from '@testing-library/react';
import user from '@testing-library/user-event';

import SelectResource from '../src/components/SelectResource';
import { selectItems, PEOPLE, FILMS } from '../src/consts';

describe('SelectResource component', () => {
    it('Snapshot', async () => {
        const props = {
            resource: 'people',
            onResourceChange: jest.fn()
        };        
        const { container } = test.render(<SelectResource {...props}/>);
        expect(container).toMatchSnapshot();
    });

    it('OnClick check', () => {
        const props = {
            resource: 'people',
            onResourceChange: jest.fn()
        };        
        const { baseElement } = test.render(<SelectResource {...props}/>);

        // click to expand select
        test.act(() => {
            const selectElement = test.screen.getByText(selectItems[PEOPLE], { exact: false });
            user.click(selectElement);
        });

        // expect that select expanded (all options exists in the document)
        Object.values(selectItems).forEach((resourceType) => {
            const optionsElement = baseElement.children[1];
            expect(within(optionsElement).getByText(resourceType)).toBeInTheDocument();
        });

        // select new value
        test.act(() => {
            const optionElement = test.screen.getByText(selectItems[FILMS]);
            user.click(optionElement);
        });
        expect(props.onResourceChange.mock.calls.length).toBe(1);
    });
})
