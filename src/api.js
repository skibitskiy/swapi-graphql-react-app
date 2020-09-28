import { gql } from '@apollo/client';

const getTitles = gql`
  query($page: Int, $resourceType: String) {
    getResources(page: $page, resourceType: $resourceType) {
      results {
        ... on IResource {
          url
        }
        ... on Film {
          title
          url
        }
        ... on People {
          name
          url
        }
        ... on Starship {
          name
          url
        }
        ... on Vehicle {
          name
          url
        }
        ... on Planet {
          name
          url
        }
        ... on Species {
          name
          url
        }
      }
    }
  }
`;

const getResource = gql`
    query($resourceType: String, $id: Int) {
        getResource(resourceType: $resourceType, id: $id) {
            ... on Film {
                title
            }
        }
    }
`;

const getCount = gql`
    query($resourceType: String) {
        getResources(page: 1, resourceType: $resourceType) {
            count
        }
    }
`;

export {
    getTitles,
    getResource,
    getCount
}
