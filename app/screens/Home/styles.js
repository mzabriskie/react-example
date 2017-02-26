'use strict';

export default {
    component: {
        width: '50%',
        display: 'inline-block',
        verticalAlign: 'top',
        background: '#fff',
        color: '#282C34',
        padding: '20px',
        '@media (maxWidth: 640px)': {
            width: '100%',
            display: 'block'
        }
    },
    searchBox: {
        padding: '20px 20px 0 20px'
    },
    viewer: {
        base: {
            fontSize: '12px',
            whiteSpace: 'pre-wrap',
            backgroundColor: '#282C34',
            border: 'solid 1px black',
            padding: '20px',
            color: '#9DA5AB',
            minHeight: '250px'
        }
    },
    toggle: {
        display: 'none'
    }
};
