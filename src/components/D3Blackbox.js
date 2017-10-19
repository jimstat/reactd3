import React, { Component } from 'react'

const D3Blackbox = (d3render) => {
    return class Blackbox extends Component {
        componentDidMount() {
            d3render.call(this)
        }
        componentDidUpdate() {
            d3render.call(this)
        }

        render() {
            const { x, y } = this.props
            return (
                <g transform={`translate(${x}, ${y})`} 
                   ref="node" />
            )
        }
    }
}

export default D3Blackbox