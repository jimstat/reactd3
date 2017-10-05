import React, { Component } from 'react'

class BlackboxLineChart extends Component {
    padding = 20
    yAxisXPos = 130
    barLabelWidth = 50
    barLabelOffset = 5

    constructor(props) {
        super(props)
        //this.createBarChart = this.createLineChart.bind(this)
    }

    componentDidMount() {
     //   this.createLineChart()
    }

    componentDidUpdate() {
     //   this.createLineChart()
    }

    // createLineCh() {
    //     function lineChart(data) {
    //         const blue = "#fe9a22", 
    //         green = "#5eaec5", 
    //         orange = "#92c463",
    //         xScale = d3.scaleLinear().domain([1,10.5]).range([20,480]),
    //         yScale = d3.scaleLinear().domain([0,35]).range([480,20]),
    //         xAxis = d3.axisBottom()
    //                   .scale(xScale)
    //                   .tickSize(480)
    //                   .tickValues([1,2,3,4,5,6,7,8,9,10])
                      
    //         d3.select("svg")
    //             .append("g")
    //             .attr("id", "xAxisG")
    //             .call(xAxis)
                
    //         yAxis = d3.axisRight()
    //             .scale(yScale)
    //             .ticks(10)
    //             .tickSize(480)
                
    //         d3.select("svg")
    //             .append("g")
    //             .attr("id", "yAxisG")
    //             .call(yAxis)
                
    //         d3.select("svg")
    //             .selectAll("circle.tweets")
    //             .data(data)
    //             .enter()
    //             .append("circle")
    //             .attr("class", "tweets")
    //             .attr("r", 5)
    //             .attr("cx", d => xScale(d.day))
    //             .attr("cy", d => yScale(d.tweets))
    //             .style("fill", blue)
                
    //         d3.select("svg")
    //             .selectAll("circle.retweets")
    //             .data(data)
    //             .enter()
    //             .append("circle")
    //             .attr("class", "retweets")
    //             .attr("r", 5)
    //             .attr("cx", d => xScale(d.day))
    //             .attr("cy", d => yScale(d.retweets))
    //             .style("fill", green)
                
    //         d3.select("svg")
    //             .selectAll("circle.favorites").data(data)
    //             .enter()
    //             .append("circle")
    //             .attr("class", "favorites")
    //             .attr("r", 5)
    //             .attr("cx", d => xScale(d.day))
    //             .attr("cy", d => yScale(d.favorites))
    //             .style("fill", orange)
    // }

    // createLine() {
    //     const lambdaXScale = d => xScale(d.day)
    //      var tweetLine = d3.line().x(lambdaXScale).y(d =>yScale(d.tweets))
    //      var retweetLine = d3.line().x(lambdaXScale).y(d => yScale(d.retweets))
    //      var favLine = d3.line().x(lambdaXScale).y(d => yScale(d.favorites))
    //      d3.select("svg").append("path").attr("d", tweetLine(data)).attr("fill", "none").attr("stroke", blue).attr("stroke-width", 2)
    //      d3.select("svg").append("path").attr("d", retweetLine(data)).attr("fill", "none").attr("stroke", green).attr("stroke-width", 2)
    //      d3.select("svg").append("path").attr("d", favLine(data)).attr("fill", "none") .attr("stroke", orange).attr("stroke-width", 2)
    // }

    // createLineChart() {
    //     const node = this.node
    //     const { data, width, height } = this.props
    //     const dataMax = max(data, d => d.total)
    //     const features = data.map(d => d.feature)
    //     const xScale = scaleLinear()
    //         .domain([0, dataMax])
    //         .range([0, width - this.yAxisXPos - this.barLabelWidth])
    //     const yScale = scaleBand()
    //         .domain(features)
    //         .rangeRound([this.padding, height - this.padding])
    //         .paddingInner(0.1)
    //     const yAxis = axisLeft().scale(yScale)

    //     select(node)
    //         .selectAll("rect")
    //         .data(data)
    //         .enter()
    //         .append("rect")

    //     select(node)
    //         .selectAll("rect")
    //         .data(data)
    //         .exit()
    //         .remove()

    //     select(node)
    //         .selectAll("rect")
    //         .data(data)
    //         .attr("y", (d, i) => yScale(d.feature))
    //         .attr("x", d => this.yAxisXPos)
    //         .attr("width", d => xScale(d.total))
    //         .attr("height", ((height - this.padding * 2) / features.length) - 5)
    //         .attr('fill', 'steelblue')

    //     select(node)
    //         .selectAll('text')
    //         .data(data)
    //         .enter()
    //         .append('text')

    //     select(node)
    //         .selectAll('text')
    //         .data(data)
    //         .exit()
    //         .remove()

    //     select(node)
    //         .selectAll('text')
    //         .data(data)
    //         .text(d => d.total)
    //         .attr('x', d => xScale(d.total) + this.yAxisXPos + this.barLabelOffset)
    //         .attr('y', d => yScale(d.feature) + 10)
    //         .attr('class', 'bar-text')

    //     select(node)
    //         .append('g')
    //         .attr('transform', `translate(${this.yAxisXPos}, 0)`)
    //         .call(yAxis);
    // }

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
