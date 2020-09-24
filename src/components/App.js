import React, { useState, useCallback } from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Resources from './Resources';
import SelectResource from './SelectResource'

const useStyles = makeStyles(() => ({
    container: {
        padding: '16px'
    }
}))

function App() {
    const styles = useStyles();

    const [resource, setResource] = useState('films');
    const onResourceChange = useCallback((event) => {
        const { value } = event.target;
        setResource(value);
    }, []);

    return(
        <Container className={styles.container} maxWidth='sm'>
            <Grid container direction='column' spacing={6}>
                <Grid item xs={12}>
                    <SelectResource resource={resource} onResourceChange={onResourceChange}/>
                </Grid>
                <Grid item xs={12}>
                    <Resources resourceType={resource}/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default App;
