import React from 'react'

const Line = ({ d, label, onHoverLine, isActive, color}) => {
    const strokeWidth = isActive ? "4" : "1"
    return (
        <path className="line" 
              d={d} 
              fill="none" 
              stroke={color} 
              strokeWidth={strokeWidth}
              onMouseOver={event => onHoverLine(label)}
              onMouseOut={event => onHoverLine(null)} />
    )
}

export default Line