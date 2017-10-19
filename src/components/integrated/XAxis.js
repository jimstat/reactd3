import * as d3 from 'd3';
import D3Blackbox from '../D3Blackbox';

const XAxis = D3Blackbox(function () {
    const axis = d3.axisBottom()
        .scale(this.props.scale);

    d3.select(this.refs.node)
        .call(axis);
})

export default XAxis;