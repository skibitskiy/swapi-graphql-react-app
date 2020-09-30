import { gql } from '@apollo/client';

const getTitles = gql`
  query getTitles($page: Int, $resourceType: String) {
    getResources(page: $page, resourceType: $resourceType) {
      id
      results {
        ... on IResource {
          url
        }
        ... on Film {
          title
        }
        ... on People {
          name
        }
        ... on Starship {
          name
        }
        ... on Vehicle {
          name
        }
        ... on Planet {
          name
        }
        ... on Species {
          name
        }
      }
    }
  }
`;

const getResource = gql`
    query getResource($resourceType: String, $id: Int) {
        getResource(resourceType: $resourceType, id: $id) {
            ... on IResource {
                url
            }
            ... on Film {
                title
            }
        }
    }
`;

const getCount = gql`
    query getCount($resourceType: String) {
        getResources(page: 1, resourceType: $resourceType) {
            id
            count
        }
    }
`;

export {
    getTitles,
    getResource,
    getCount
}
