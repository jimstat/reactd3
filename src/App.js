import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap'
import BlackboxBarChart from './blackbox/BarChart';
import logo from './logo.svg';
import d3logo from './d3logo.svg';
import './App.css';

class App extends Component {
  state = {
    data: {
      current: []
    }
  }
  componentDidMount() {
    fetch('data.json')
    .then(response => response.json())
    .then(data => this.setState(this.processData(data)))
  }
  processData(data) {
    const [ min, max ] = [10, 10000]
    const current = Object.keys(data.current).map(feature => {
      let total = data.current[feature].total_traffic
      total = isNaN(total) || total < 50 
        ? Math.random() * (max - min) + min
        : total

      return {
        feature,
        total
      }
    })

    return {
      data: {
        current
      }
    }
  }
  render() {
    const data = this.state.data

    return (
      <div className="App container">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={d3logo} className="App-logo" alt="logo" />
          <h2>React and D3</h2>
        </div>
        <Grid fluid={true}>
          <Row>
            <Col>
              <p className="App-intro">Blackbox</p>
            </Col>
          </Row>
          <Row>
            <Col xs={9} md={6}><BlackboxBarChart data={data.current}
                                                 width={500}
                                                 height={500} /></Col>
            <Col xs={9} md={6}>Second column</Col>
          </Row>
        </Grid>
        
      </div>
    );
  }
}

export default App;
