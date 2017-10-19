import React, { Component } from 'react'
import { line } from 'd3-shape'
import { nest } from 'd3-collection'
import { scaleLinear, scaleTime } from 'd3-scale'
import { max, extent, ascending } from 'd3-array'
import XAxis from './XAxis'
import YAxis from './YAxis'
import Line from './Line'
import Legend from './Legend'
import featureColors from '../../data/FeatureColors'

class IntegratedLineChart extends Component {

    static defaultProps = {
        data: [],
        height: 0,
        width: 0
    }

    constructor(props) {
        super(props)

        this.state = { highlightedFeature: '' }
        this.updateD3 = this.updateD3.bind(this)
        this.makeLine = this.makeLine.bind(this)
        this.highlightFeature = this.highlightFeature.bind(this)

        this.xScale = scaleTime()
        this.yScale = scaleLinear()
        this.lineGenerator = line()
            .x(d => this.xScale(d.date))
            .y(d => this.yScale(d.count))
        this.lineData = []
        this.legendItems = []
        this.padding = 30
    }

    componentWillReceiveProps(props) {
        this.updateD3(props)
    }

    transformData(data) {
        return nest()
            .key(d => d.feature)
            .sortKeys(ascending)
            .entries(data);
    }

    updateD3({ data, width, height }) {
        this.lineData = this.transformData(data)
        this.legendItems = this.lineData.map((series, idx) => ({ label: series.key, color: featureColors(series.key) }))

        this.xScale
            .domain(extent(data, d => d.date))
            .range([0, width])

        this.yScale = scaleLinear()
            .domain([0, max(data, d => d.count)])
            .range([height - this.padding, this.padding])

        this.lineGenerator
            .x(d => this.xScale(d.date))
            .y(d => this.yScale(d.count))
    }

    highlightFeature(feature) {
        this.setState({ highlightedFeature: feature })
    }

    makeLine(series) {
        const attrs = {
            key: series.key,
            label: series.key,
            d: this.lineGenerator(series.values),
            color: featureColors(series.key),
            isActive: this.state.highlightedFeature === series.key,
            onHoverLine: this.highlightFeature
        }

        return (
            <Line {...attrs} />
        )
    }

    render() {
        const { width, height, title } = this.props
        return (
            <div>
                <h4>{title}</h4>
                <svg width={width}
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}>
                    <Legend x={80}
                        y={this.padding * 2}
                        items={this.legendItems}
                        activeItem={this.state.highlightedFeature}
                        onHoverItem={this.highlightFeature} />
                    <g transform={`translate(${250}, ${0})`}
                       height={height}>
                        <XAxis scale={this.xScale}
                            x={0}
                            y={height - this.padding} />
                        <YAxis scale={this.yScale}
                            x={0}
                            y={0}
                            height={height}
                            label='Count' />
                        {this.lineData.map(series => this.makeLine(series))}
                    </g>
                </svg>
            </div>
        )
    }
}

export default IntegratedLineChart
