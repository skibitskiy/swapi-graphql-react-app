import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Select, InputLabel, MenuItem, Paper } from '@material-ui/core';

import { selectItems, CHOOSE_OBJECT } from '../consts';

const useStyles = makeStyles(() => ({
  paper: {
    padding: '16px'
  }
}));

function SelectResource(props) {
  const styles = useStyles();
  const { resource, onResourceChange } = props;

  return (
    <Paper className={styles.paper}>
      <InputLabel>{ CHOOSE_OBJECT }</InputLabel>
      <Select value={resource} onChange={onResourceChange}>
        {
          Object.keys(selectItems).map((resourceType) => 
            <MenuItem key={resourceType} value={resourceType}>{ selectItems[resourceType] }</MenuItem>
          )
        }
      </Select>
    </Paper>  
  );
}

export default memo(SelectResource);
