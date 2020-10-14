import '@testing-library/jest-dom/extend-expect';
import waitForExpect from 'wait-for-expect';
import React from 'react';
import * as test from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import Resources from '../src/components/Resources';
import { getTitles } from '../src/api';
import { apolloCache } from './helpers';

describe('Resources component', () => {
    it('Snapshot', async () => {
        const props = {
            resourceType: 'people',
            currentPage: 1
        };
        const mocks = [
            {
                request: {
                    query: getTitles,
                    variables: {
                        resourceType: props.resourceType,
                        page: props.currentPage
                    }
                },
                result: {
                    data: {
                        getResources: {
                            __typename: 'Resources',
                            id: 'people-1',
                            results: ['Luke Skywalker', 'OG Buda']
                                .map((name, index) => ({ name, __typename: 'People', url: `/${index}/` }))
                        }
                    }
                }
            }
        ];
        const { container } = test.render(
            <MockedProvider mocks={mocks} cache={apolloCache()}>
                <Resources {...props}/>
            </MockedProvider>
        );

        // loading state
        expect(container).toMatchSnapshot();

        // final state
        await waitForExpect(() => {
            expect(test.screen.getByText('OG Buda', { exact: false })).toBeInTheDocument();
        });
        expect(container).toMatchSnapshot();
    })
})
