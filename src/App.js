import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap'
import BlackboxBarChart from './blackbox/BarChart';
import logo from './logo.svg';
import d3logo from './d3logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
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
            <Col xs={9} md={6}><BlackboxBarChart /></Col>
            <Col xs={9} md={6}>Second column</Col>
          </Row>
        </Grid>
        
      </div>
    );
  }
}

export default App;
