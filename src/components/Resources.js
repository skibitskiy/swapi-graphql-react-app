import React, { useState, useEffect, memo } from 'react';
import { useQuery } from '@apollo/client';
import { Paper } from '@material-ui/core';

import Resource from './Resource';
import Progress from './Progress';

import { getTitles } from '../api';

function Resources(props) {
  const { resourceType, currentPage } = props;
  const [resources, setResources] = useState([]);
  const { loading, data } = useQuery(getTitles, { variables: { page: currentPage, resourceType } });

  useEffect(() => {
    setResources([]);
  }, [resourceType, currentPage]);

  useEffect(() => {
    if (data !== undefined) {
      const { results } = data.getResources;
      const resources = results.map((resource) => ({ url: resource.url, name: resource.name || resource.title }));
      setResources(resources);
    }
  }, [data]);

  return (
    <Paper>
      {
        loading
          ? <Progress/>
          : resources.map(({ name, url }) => <Resource key={url} resourceType={resourceType} name={name} url={url}/>)
      }
    </Paper>
  )
}

export default memo(Resources);