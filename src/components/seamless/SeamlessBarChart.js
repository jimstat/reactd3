import React, { Component } from 'react'
import { withFauxDOM } from 'react-faux-dom'
import { scaleLinear, scaleBand } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { axisLeft } from 'd3-axis'

class SeamlessBarChart extends Component {

    padding = 20
    yAxisXPos = 130
    barLabelWidth = 50
    barLabelOffset = 5

    constructor(props) {
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
    }

    componentDidMount() {
        this.createBarChart()
    }

    // componentDidUpdate() {
    //     this.createBarChart()
    // }

    createBarChart() {
        const faux = this.props.connectFauxDOM('g', 'chart')
        //const node = this.node
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

        select(faux)
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")

        select(faux)
            .selectAll("rect")
            .data(data)
            .exit()
            .remove()

        select(faux)
            .selectAll("rect")
            .data(data)
            .attr("y", (d, i) => yScale(d.feature))
            .attr("x", d => this.yAxisXPos)
            .attr("width", d => xScale(d.total))
            .attr("height", ((height - this.padding * 2) / features.length) - 5)
            .attr('fill', 'steelblue')

        select(faux)
            .selectAll('text')
            .data(data)
            .enter()
            .append('text')

        select(faux)
            .selectAll('text')
            .data(data)
            .exit()
            .remove()

        select(faux)
            .selectAll('text')
            .data(data)
            .text(d => d.total)
            .attr('x', d => xScale(d.total) + this.yAxisXPos + this.barLabelOffset)
            .attr('y', d => yScale(d.feature) + 10)
            .attr('class', 'bar-text')

        select(faux)
            .append('g')
            .attr('transform', `translate(${this.yAxisXPos}, 0)`)
            .call(yAxis);

        this.props.animateFauxDOM(800)
    }

    render() {
        const { width, height, title } = this.props
        const chart = this.createBarChart()
        return (
            <div>
                <h4>{title}</h4>
                <svg ref={node => this.node = node}
                    width={width}
                    height={height}>
                    {this.props.chart}
                </svg>
            </div>
        )
    }
}

export default withFauxDOM(SeamlessBarChart)