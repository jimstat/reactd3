import React, { Component } from 'react'
import _ from 'lodash'
import { line } from 'd3-shape'
import { nest } from 'd3-collection'
import { scaleLinear, scaleTime } from 'd3-scale'
import { max, extent } from 'd3-array'
import { select } from 'd3-selection'
import { axisLeft, axisBottom } from 'd3-axis'

class BlackboxLineChart extends Component {

    static defaultProps = {
        data: []
    }

    padding = 20
    yAxisXPos = 130
    barLabelWidth = 50
    barLabelOffset = 5

    constructor(props) {
        super(props)
        this.renderChart = this.renderChart.bind(this)
    }

    componentDidMount() {
        this.renderChart()
    }

    componentDidUpdate() {
        this.renderChart()
    }

    transformData(data) {
        return nest()
        .key(function(d){ return d.feature; })
        .entries(data);
    }
    
    renderChart() {
        const { data, width, height } = this.props
        const svg = select(this.node)
        const xScale = scaleTime()
            .domain(extent(data, d => d.date))
            .range([0, width])

        const yScale = scaleLinear()
            .domain([0, max(data, d => d.count)])
            .range([height - this.padding, 0])

        this.renderAxes(svg, xScale, yScale)
        this.renderLines(svg, xScale, yScale)
    }

    renderAxes(svg, xScale, yScale) {
        const { height } = this.props
        const xAxis = axisBottom().scale(xScale)
            .ticks(10)
        const yAxis = axisLeft().scale(yScale)

        svg.append('g')
            .attr('transform', `translate(0, ${height - this.padding})`)
            .call(xAxis);

        svg.append('g')
            .call(yAxis);
    }

    renderLines(svg, xScale, yScale) {
        const data = this.transformData(this.props.data)
        const lineGenerator = line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.count))

        var pathLines = svg.selectAll("path.line")
            .data(data)

        pathLines
            .enter()
            .append("path")
            .merge(pathLines)
            .style("stroke", function (d, i) {
                return 'red' 
            })
            .style('fill', 'none')
            .attr("class", "line")
            .attr("d", function (d) {
                return lineGenerator(d.values);
            });
    }

    render() {
        const { width, height, title } = this.props
        return (
            <div>
                <h4>{title}</h4>
                <svg ref={node => this.node = node}
                    width={width}
                    height={height}>
                </svg>
            </div>
        )
    }
}

export default BlackboxLineChart
