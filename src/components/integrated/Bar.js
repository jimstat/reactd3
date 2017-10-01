import React, { Component } from 'react'

const Bar = ({ x, y, width, height, color = 'red', label}) => {
    const translate = `translate(${x}, ${y})`
    const labelXOffset = 5
    const labelYOffset = 3
    
    return (
        <g transform={translate} className="bar">
            <rect width={width}
                  height={height}
                  fill={color}>
            </rect>
            <text className="bar-text"
                  x={width + labelXOffset}
                  y={height/2 + labelYOffset}>
                {label}
            </text>
        </g>
    )
}

export default Bar