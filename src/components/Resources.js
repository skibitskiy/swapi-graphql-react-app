import React, { useState, useEffect, memo } from 'react';
import { Paper } from '@material-ui/core';

import Resource from './Resource';
import Progress from './Progress';

import { fetchTitles } from '../api'

function Resources(props) {
  const { resourceType, currentPage } = props;
  const [resources, setResources] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTitles(resourceType, currentPage)
      .then((resources) => setResources(resources))
      .then(() => setLoading(false))
  }, [resourceType, currentPage])

  return (
    <Paper>
      {
        isLoading
          ? <Progress/>
          : resources.map(({ name, url}) => <Resource key={url} name={name} url={url}/>)
      }
    </Paper>
  )
}

export default memo(Resources);