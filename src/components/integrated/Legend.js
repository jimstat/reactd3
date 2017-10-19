import React from 'react'
import LegendItem from './LegendItem'

const Legend = ({ items, x, y, activeItem, onHoverItem }) => {
    const size = 20
    return (
        <g transform={`translate(${x}, ${y})`}>
            {items.map((item, idx) =>
                <LegendItem key={idx}
                    label={item.label}
                    color={item.color}
                    size={size}
                    isActive={activeItem === item.label}
                    onHoverItem={onHoverItem}
                    y={idx * size + 10} />
            )}
        </g>
    )
}

export default Legend