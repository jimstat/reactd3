import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'

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
        const node = this.node
        const { data, height } = this.props
        const dataMax = max(data, d => d.total)
        const yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, height - padding])

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
            .attr("x", (d, i) => i * 25)
            .attr("y", d => height - yScale(d.total))
            .attr("height", d => yScale(d.total))
            .attr("width", 25)
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