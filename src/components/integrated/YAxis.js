import React, { Component } from 'react';
import * as d3 from 'd3';
import D3blackbox from '../D3Blackbox';

const YAxis = D3blackbox(function () {
    const axis = d3.axisLeft()
                   .scale(this.props.scale);

    d3.select(this.refs.node)
      .call(axis);
})

export default YAxis;