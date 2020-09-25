import React, { useState, useCallback, useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Resources from './Resources';
import SelectResource from './SelectResource'
import Pages from './Pages'

import { fetchPageCount } from '../api'

const useStyles = makeStyles(() => ({
    container: {
        padding: '16px'
    }
}))

function App() {
    const styles = useStyles();

    const [resourceType, setResourceType] = useState('films');
    const onResourceTypeChange = useCallback((event) => {
        const { value } = event.target;
        setResourceType(value);
        setCurrentPage(1);
    }, []);

    const [pageCount, setPageCount] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const onPageClick = useCallback((event) => {
        const { page } = event.target.dataset;
        setCurrentPage(parseInt(page));
    }, []);

    useEffect(() => {
        fetchPageCount(resourceType).then((count) => setPageCount(count))
    }, [resourceType]);

    return(
        <>
            <Pages count={pageCount} onClick={onPageClick}/>
            <Container className={styles.container} maxWidth='sm'>
                <Grid container direction='column' spacing={2}>
                    <Grid item xs={12}>
                        <SelectResource resource={resourceType} onResourceChange={onResourceTypeChange}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Resources resourceType={resourceType} currentPage={currentPage}/>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default App;