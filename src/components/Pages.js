import React, { memo } from 'react';
import { MenuList, MenuItem, Paper } from '@material-ui/core';

function Pages(props) {
    const { count, onClick } = props;

    return (
        <div style={{
            height: '100vh',
            position: 'fixed',
            display: 'flex',
            alignItems: 'center',
            left: '16px'
        }}>
            <Paper>
                <MenuList onClick={onClick}>
                    { Array.from(Array(count), ((_, i) => <MenuItem data-page={i + 1} key={i}>{ i + 1 }</MenuItem>)) }
                </MenuList>
            </Paper>
        </div>
    )
}

export default memo(Pages);
