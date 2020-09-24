import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Select, InputLabel, MenuItem, Grid, Paper } from '@material-ui/core';

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
      <InputLabel>Выбери объект</InputLabel>
      <Select value={resource} onChange={onResourceChange}>
        <MenuItem value='films'>Фильмы</MenuItem>
        <MenuItem value='people'>Персонажи</MenuItem>
        <MenuItem value='planets'>Планеты</MenuItem>
        <MenuItem value='species'>Списы</MenuItem>
        <MenuItem value='starships'>Звездолеты</MenuItem>
        <MenuItem value='vehicles'>Механизмы</MenuItem>
      </Select>
    </Paper>  
  );
}

export default SelectResource;
