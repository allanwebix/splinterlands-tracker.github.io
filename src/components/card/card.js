import React from 'react'

const Card = (props) => {
    return (
        <div className={`card ${props.className}`} {...props}>
            <div className={`card-header ${props.headerclass}`}>{props.header}</div>
            <div className="card-body" style={{minHeight: '75px'}}>
                {props.children}
            </div>
        </div>
    )
}

export default Card;