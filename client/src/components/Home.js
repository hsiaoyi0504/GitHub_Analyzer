/* eslint
no-console: "off",
no-underscore-dangle: "off" */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>GitHub Analyzer</h2>
        </div>
      </div>
    );
  }
}

export default Home;
