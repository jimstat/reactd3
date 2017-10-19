import React from 'react'

const LegendItem = ({ label, color, size, y, isActive, onHoverItem }) => {
    const rect = {
        x: 35,
        y: y - 15,
        width: size,
        height: size
    }
    const className = isActive ? 'legend-item active' : 'legend-item'
    return (
        <g className={className}
            onMouseOver={event => onHoverItem(label)}
            onMouseOut={event => onHoverItem(null)}>
            <text x={size}
                y={y}
                textAnchor="end">
                {label}
            </text>
            <rect width={rect.width}
                height={rect.height}
                x={rect.x}
                y={rect.y}
                style={{
                    fill: color,
                    stroke: color
                }} />
        </g>
    )
}

export default LegendItem
