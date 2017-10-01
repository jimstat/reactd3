import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap'
import processData from './data/DataHandler';
import Layout from './components/layout/Layout'
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
      .then(data => this.setState(processData(data)))
  }
  render() {
    return (
      <div className="App container">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={d3logo} className="App-logo" alt="logo" />
          <h2>React and D3</h2>
        </div>
        <Layout data={this.state.data} />
      </div>
    );
  }
}

export default App;
