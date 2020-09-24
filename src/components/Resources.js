import React, { useState } from 'react';
import { Paper } from '@material-ui/core';

import Resource from './Resource'

function Resources(props) {
  const { resourceType } = props;
  const [page, setPage] = useState(1);

  const names = ['pop'];

  return (
    <Paper>
      {
        names.map((name) => <Resource/>)
      }
    </Paper>
  )
}

export default Resources;