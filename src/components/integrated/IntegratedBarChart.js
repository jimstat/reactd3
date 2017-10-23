import React, { Component } from 'react'
import Bar from './Bar'
import YAxis from './YAxis'
import { scaleLinear, scaleBand } from 'd3-scale'
import { max } from 'd3-array'

class IntegratedBarChart extends Component {
    static defaultProps = {
        width: 500,
        height: 500,
        data: []
    }

    padding = 20
    yAxisXPos = 130
    barLabelWidth = 50

    constructor(props) {
        super(props)

        this.features = []
        this.xScale = scaleLinear()
        this.yScale = scaleBand()
        this.makeBar = this.makeBar.bind(this)
        this.updateD3(this.props)
    }

    //invoked before render
    componentWillReceiveProps(newProps) {
        this.updateD3(newProps)
    }

    updateD3(props) {
        const dataMax = max(props.data, d => d.total)

        this.width = props.width
        this.height = props.height
        this.features = props.data.map(d => d.feature)

        this.xScale.domain([0, dataMax])
            .range([0, this.width - this.yAxisXPos - this.barLabelWidth])
        this.yScale.domain(this.features)
            .rangeRound([this.padding, this.height - this.padding])
            .paddingInner(0.1)
    }

    makeBar(bar) {
        const p = {
            x: this.yAxisXPos,
            y: this.yScale(bar.feature) + this.padding,
            width: this.xScale(bar.total),
            height: ((this.height - this.padding * 2) / this.features.length) - 5,
            color: 'steelblue',
            label: bar.total
        }
        return (
            <Bar key={bar.feature} {...p} />
        )
    }

    render() {
        const { data, width, height } = this.props

        return (
            <svg width={width} height={height} >
                <YAxis scale={this.yScale}
                    x={this.yAxisXPos}
                    y={this.padding} />
                <g className="bars">
                    {data.map(this.makeBar)}
                </g>
            </svg>
        )
    }
}

export default IntegratedBarChart