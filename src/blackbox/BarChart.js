import React, { Component } from 'react'
import { scaleLinear, scaleBand } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { axisLeft } from 'd3-axis'

class BlackboxBarChart extends Component {
    constructor(props) {
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
    }

    componentDidMount() {
        this.createBarChart()
    }

    componentDidUpdate() {
        this.createBarChart()
    }

    createBarChart() {
        const padding = 20;
        const yAxisXPos = 130;
        const barLabelWidth = 50;
        const node = this.node
        const { data, width, height } = this.props
        const dataMax = max(data, d => d.total)
        const features = data.map(d => d.feature)
        const xScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, width - yAxisXPos - barLabelWidth])
        const yScale = scaleBand()
            .domain(features)
            .rangeRound([padding, height - padding])
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
            .attr("y", (d, i) => yScale(d.feature))
            .attr("x", d => yAxisXPos)
            .attr("width", d => xScale(d.total))
            .attr("height", ((height - padding * 2)  / features.length) - 5)
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
            .attr('x', d => xScale(d.total) + yAxisXPos + 5)
            .attr('y', d => yScale(d.feature) + 10)
            .attr('font-size', '10px')

        select(node)
            .append('g')
            .attr('transform', `translate(${yAxisXPos}, 0)`)
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