import React, { useState, useEffect, memo } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Paper } from '@material-ui/core';

import Resource from './Resource';
import Progress from './Progress';

const getTitles = gql`
  query($page: Int, $resourceType: String) {
    getResources(page: $page, resourceType: $resourceType) {
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

function Resources(props) {
  const { resourceType, currentPage } = props;
  const [resources, setResources] = useState([]);
  const { loading, data } = useQuery(getTitles, { variables: { page: currentPage, resourceType } });

  useEffect(() => {
    if (data !== undefined) {
      const { results } = data.getResources;
      const resources = results.map((resource) => ({ url: resource.url, name: resource.name || resource.title }));
      setResources(resources);
    }
  }, [data])

  return (
    <Paper>
      {
        loading
          ? <Progress/>
          : resources.map(({ name, url}) => <Resource key={url} name={name} url={url}/>)
      }
    </Paper>
  )
}

export default memo(Resources);