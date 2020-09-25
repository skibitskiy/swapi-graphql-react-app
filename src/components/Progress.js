import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => ({
    progress: {
      margin: '16px 0'
    }
  }));

function Progress() {
    const styles = useStyle();
    return (
        <Grid container justify="center">
            <Grid item>
                <CircularProgress className={styles.progress}/>
            </Grid>
        </Grid>
    )
}

export default Progress
