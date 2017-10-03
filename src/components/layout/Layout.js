import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import BlackboxBarChart from '../blackbox/BlackboxBarChart';
import IntegratedBarChart from '../integrated/IntegratedBarChart';
import SeamlessBarChart from '../seamless/SeamlessBarChart';

class Layout extends Component {
  render() {
    const data = this.props.data

    return (
      <Grid fluid={true}>
        <Row>
          <Col>
            <BlackboxBarChart title="Blackbox" data={data.current} width={500} height={500} />
          </Col>
          <Col>
            <IntegratedBarChart title="Integrated" data={data.current} width={500} height={500} />
          </Col>
          <Col>
            <SeamlessBarChart title="Seamless" data={data.current} width={500} height={500} />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Layout