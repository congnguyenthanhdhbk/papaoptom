import React from 'react';
export const RUFlag = ({ width = '640px', height = '480px' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" width={width} height={height}>
            <rect fill="#fff" width="9" height="3"/>
            <rect fill="#d52b1e" y="3" width="9" height="3"/>
            <rect fill="#0039a6" y="2" width="9" height="2"/>
        </svg>
    );
}
