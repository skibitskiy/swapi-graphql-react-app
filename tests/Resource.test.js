import '@testing-library/jest-dom/extend-expect';
import waitForExpect from 'wait-for-expect';
import React from 'react';
import * as test from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { InMemoryCache } from '@apollo/client';
import user from '@testing-library/user-event';

import Resource from '../src/components/Resource';
import { getResource } from '../src/api';

describe('Resource component', () => {
    it('Snapshot', async () => {
        const props = {
            name: 'Luke Skywalker',
            resourceType: 'people',
            url: 'http://swapi.dev/api/people/1/'
        };
        const mocks = [
            {
                request: {
                    query: getResource,
                    variables: {
                        resourceType: props.resourceType,
                        id: parseInt(props.url.match(/(\d+)\/$/)[1])
                    }
                },
                result: {
                    data: {
                        getResource: {
                            url: props.url,
                            __typename: 'People'
                        }
                    }
                }
            }
        ];
        const cache = new InMemoryCache({
            possibleTypes: {
                IResource: ['Film', 'People', 'Species', 'Vehicle', 'Starship', 'Planet']
            }
        });
        const { container } = test.render(
            <MockedProvider mocks={mocks} cache={cache}>
                <Resource {...props}/>
            </MockedProvider>
        );

        // start state
        expect(container).toMatchSnapshot();

        // loading state
        const resource = test.screen.getByText(props.name);
        test.act(() => {
            user.click(resource);
        });
        expect(container).toMatchSnapshot();

        // final state
        await waitForExpect(() => {
            expect(test.screen.getByText('url', { exact: false })).toBeInTheDocument();
        });
        expect(container).toMatchSnapshot();
    })
})
