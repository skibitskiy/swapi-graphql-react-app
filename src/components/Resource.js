import React, { useCallback, useState, useMemo, memo } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import Progress from './Progress';

import { getResource } from '../api';

const getPrettyDescription = (resource) =>
    Object.entries(resource)
        .map((res) => <>{ res.join(': ').slice(0, 20) }<br/></>)

function Resource(props) {
    const { name, url, resourceType } = props;
    const id = useMemo(() => parseInt(url.match(/(\d+)\/$/)[1]), [url]);

    const [fetchResource, { loading, data: resource }] = useLazyQuery(getResource, { variables: { id, resourceType } });

    const [expanded, setExpanded] = useState(false);
    const onExpand = useCallback(() => {
        setExpanded((state) => !state)
        if (expanded === false && resource === undefined) {
            fetchResource()
        }
    }, [expanded, resource, fetchResource])
    
    return (
        <Accordion expanded={expanded} onChange={onExpand}>
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{ name }</Typography>
            </AccordionSummary>
            <AccordionDetails>
                { 
                    loading || resource === undefined
                        ? <Progress/>
                        : getPrettyDescription(resource.getResource)
                }
            </AccordionDetails>
        </Accordion>
    )
}

export default memo(Resource);
