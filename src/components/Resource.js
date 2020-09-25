import React, { useCallback, useState, memo } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import Progress from './Progress';

import { fetchResource } from '../api'

const getPrettyDescription = (resource) =>
    Object.entries(resource)
        .map((res) => <>{ res.join(': ').slice(0, 20) }<br/></>)

function Resource(props) {
    const { name, url } = props;
    const [resource, setResource] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const [expanded, setExpanded] = useState(false);
    const onExpand = useCallback(() => {
        setExpanded((state) => !state)
        if (expanded === false && resource === null) {
            setLoading(true);
            fetchResource(url)
                .then((resource) => setResource(resource))
                .then(() => setLoading(false))
        }
    }, [expanded, url, resource])

    return (
        <Accordion expanded={expanded} onChange={onExpand}>
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{ name }</Typography>
            </AccordionSummary>
            <AccordionDetails>
                { 
                    isLoading
                        ? <Progress/>
                        : getPrettyDescription(resource)
                }
            </AccordionDetails>
        </Accordion>
    )
}

export default memo(Resource);
