import React, { Component } from 'react'
import { scaleLinear, scaleBand } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { axisLeft } from 'd3-axis'

class BlackboxBarChart extends Component {

    padding = 20
    yAxisXPos = 130
    barLabelWidth = 50
    barLabelOffset = 5

    constructor(props) {
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
    }

    //Initialization that requires DOM nodes should go here.
    componentDidMount() {
        this.createBarChart()
    }

    //This method is not called for the initial render.
    //Use this as an opportunity to operate on the DOM when the component has been updated.
    componentDidUpdate() {
        this.createBarChart()
    }

    createBarChart() {
        const node = this.node
        const { data, width, height } = this.props
        const dataMax = max(data, d => d.total)
        const features = data.map(d => d.feature)
        const xScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, width - this.yAxisXPos - this.barLabelWidth])
        const yScale = scaleBand()
            .domain(features)
            .rangeRound([this.padding, height - this.padding])
            .paddingInner(0.1)
        const yAxis = axisLeft().scale(yScale)

        select(node)
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")

        select(node)
            .selectAll("rect")
            .data(data)
            .exit()
            .remove()

        select(node)
            .selectAll("rect")
            .data(data)
            .attr("y", (d, i) => yScale(d.feature) + 1)
            .attr("x", d => this.yAxisXPos)
            .attr("width", d => xScale(d.total))
            .attr("height", ((height - this.padding * 2) / features.length) - 5)
            .attr('fill', 'steelblue')

        select(node)
            .selectAll('text')
            .data(data)
            .enter()
            .append('text')

        select(node)
            .selectAll('text')
            .data(data)
            .exit()
            .remove()

        select(node)
            .selectAll('text')
            .data(data)
            .text(d => d.total)
            .attr('x', d => xScale(d.total) + this.yAxisXPos + this.barLabelOffset)
            .attr('y', d => yScale(d.feature) + 14)
            .attr('class', 'bar-text')

        select(node)
            .append('g')
            .attr('transform', `translate(${this.yAxisXPos}, 0)`)
            .call(yAxis);
    }

    render() {
        const { width, height } = this.props
        return (
            <svg ref={node => this.node = node}
                width={width}
                height={height}>
            </svg>
        )
    }
}

export default BlackboxBarChart