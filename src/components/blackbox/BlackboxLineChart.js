import React, { Component } from 'react'
import { line } from 'd3-shape'
import { nest } from 'd3-collection'
import { scaleLinear, scaleTime } from 'd3-scale'
import { max, extent } from 'd3-array'
import { select } from 'd3-selection'
import { axisLeft, axisBottom } from 'd3-axis'
import featureColors from '../../data/FeatureColors'

class BlackboxLineChart extends Component {

    static defaultProps = {
        data: []
    }

    padding = 20

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
            .key(function (d) { return d.feature; })
            .entries(data);
    }

    renderChart() {
        const { data, width, height } = this.props
        const x = 250
        const y = 0
        const lineData = this.transformData(data)

        const legendItems = lineData.map((series, idx) => ({ label: series.key, color: featureColors(series.key) }))
        this.svg = select(this.node)

        const chartG = this.svg
            .append('g')
            .attr('transform', `translate(${x}, ${y})`)
        const xScale = scaleTime()
            .domain(extent(data, d => d.date))
            .range([0, width - x])

        const yScale = scaleLinear()
            .domain([0, max(data, d => d.count)])
            .range([height - this.padding, 0])

        this.renderLegend(80, this.padding * 2, legendItems)
        this.renderAxes(chartG, xScale, yScale)
        this.renderLines(chartG, xScale, yScale, lineData)
    }

    renderAxes(g, xScale, yScale) {
        const { height } = this.props
        const xAxis = axisBottom().scale(xScale)
            .ticks(10)
        const yAxis = axisLeft().scale(yScale)

        g.append('g')
            .attr('transform', `translate(0, ${height - this.padding})`)
            .call(xAxis);

        g.append('g')
            .call(yAxis);

        g.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -(height / 2))
            .attr('y', -50)
            .attr('text-anchor', 'middle')
            .text('Count')
    }

    renderLines(g, xScale, yScale, lineData) {
        const lineGenerator = line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.count))

        const pathLines = g.selectAll("path.line")
            .data(lineData)

        pathLines
            .enter()
            .append("path")
            .merge(pathLines)
            .style("stroke", function (d, i) {
                return 'red'
            })
            .style('fill', 'none')
            .style('stroke', d => featureColors(d.key))
            .attr("class", "line")
            .attr('name', d => d.key)
            .attr("d", function (d) {
                return lineGenerator(d.values);
            })
            .on('mouseover', d => this.highlightFeature(d, true))
            .on('mouseout', d => this.highlightFeature(d, false));
    }

    renderLegend(x, y, items) {
        const size = 20
        const rect = {
            x: 35,
            width: size,
            height: size
        }

        const legend = this.svg.append('g')
            .attr('x', x)
            .attr('y', y)
            .attr('transform', `translate(${x}, ${y})`)

        const item = legend.selectAll('g.legend-item')
            .data(items)
            .enter()
            .append('g')
            .attr('class', 'legend-item')
            .attr('name', d => d.label)
            .on('mouseover', d => this.highlightFeature(d, true))
            .on('mouseout', d => this.highlightFeature(d, false))

        item.append('text')
            .text(d => d.label)
            .attr('text-anchor', 'end')
            .attr('x', size)
            .attr('y', (d, i) => i * size + 10)

        item.append('rect')
            .attr('x', rect.x)
            .attr('y', (d, i) => i * size - 5)
            .attr('width', rect.width)
            .attr('height', rect.height)
            .style('fill', d => featureColors(d.label))
            .style('stroke', d => featureColors(d.label))
    }

    highlightFeature(d, highlighted) {
        const name = d.label || d.key
        select(`g.legend-item[name="${name}"]`)
            .classed('active', highlighted)

        select(`path.line[name="${name}"]`)
            .style('stroke-width', highlighted ? '4' : '1')
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
