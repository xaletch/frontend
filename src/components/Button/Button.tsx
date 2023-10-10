import React from 'react'

import './Button.css';

export const Button = (props: any) => {
    return (
        <button {...props} className={'button ' + props.className}/>
    )
}
