import React from 'react';
import * as test from '@testing-library/react';
import user from '@testing-library/user-event';
import Pages from '../src/components/Pages';

describe('Pages component', () => {
    it('Snapshot', () => {
        const mockedOnClick = jest.fn();
        const { container } = test.render(<Pages count={3} onClick={mockedOnClick}/>) ;
        expect(container).toMatchSnapshot();
    })

    it('onClick check', () => {
        const mockedOnClick = jest.fn();
        test.render(<Pages count={3} onClick={mockedOnClick}/>) ;

        ['1', '2'].forEach((text) => {
            const button = test.screen.getByText(text);
            user.click(button);
        });
        expect(mockedOnClick.mock.calls.length).toBe(2)
    })
});
