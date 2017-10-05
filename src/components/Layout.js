import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import BlackboxLineChart from './blackbox/BlackboxLineChart';
import BlackboxBarChart from './blackbox/BlackboxBarChart';
import IntegratedBarChart from './integrated/IntegratedBarChart';
import SeamlessBarChart from './seamless/SeamlessBarChart';

class Layout extends Component {
  render() {
    const data = this.props.data

    return (
      <Grid fluid={true}>
        <Row>
          <Col>
            <BlackboxLineChart title="Blackbox Line" data={data.timeSeries} width={500} height={500} />
          </Col>
        </Row>
        <Row>
          <Col>
            <BlackboxBarChart title="Blackbox" data={data.current} width={500} height={500} />
          </Col>
        </Row>
        <Row>
          <Col>
            <IntegratedBarChart title="Integrated" data={data.current} width={500} height={500} />
          </Col>
        </Row>
        <Row>
          <Col>
            <SeamlessBarChart title="Seamless" data={data.current} width={500} height={500} />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Layout