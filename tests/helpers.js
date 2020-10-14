import { InMemoryCache } from '@apollo/client';

const apolloCache = () => new InMemoryCache({
    possibleTypes: {
        IResource: ['Film', 'People', 'Species', 'Vehicle', 'Starship', 'Planet']
    },
    typePolicies: {
        People: {
            keyFields: ['url']
        },
        Species: {
            keyFields: ['url']
        },
        Starship: {
            keyFields: ['url']
        },
        Film: {
            keyFields: ['url']
        },
        Planet: {
            keyFields: ['url']
        },
        Vehicles: {
            keyFields: ['url']
        },
        Resources: {
            keyFields: ['id']
        }
    }
});

export {
    apolloCache
}
