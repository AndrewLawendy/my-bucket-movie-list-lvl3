import React from 'react'

function Snake(props){
    const {message} = props;
    return (
        <div id="snake">
            <p id="snake-message">{message}</p>
        </div>
    )
}

export default Snake;