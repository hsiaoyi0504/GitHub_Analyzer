/* eslint
no-console: "off",
no-underscore-dangle: "off" */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './style.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({redirect: true});
    event.preventDefault();
  }

  render() {
    if(this.state.redirect){
      return <Redirect push to={"/user/"+this.state.value} />;
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2>GitHub Analyzer</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            User name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Home;
