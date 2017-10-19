import React from 'react'
import * as d3 from 'd3';
import D3Blackbox from '../D3Blackbox';

const D3YAxis = D3Blackbox(function () {
  const axis = d3.axisLeft()
    .scale(this.props.scale);

  d3.select(this.refs.node)
    .call(axis);
})

const YAxis = (props) => {
  return (
    <g>
      <D3YAxis {...props} />
      <text transform="rotate(-90)"
        x={props.height ? -(props.height / 2) : 0}
        y={-50}
        textAnchor="middle">{props.label}</text>
    </g>
  )
}

export default YAxis;