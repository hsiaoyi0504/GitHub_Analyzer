/* eslint
no-console: "off",
no-underscore-dangle: "off" */
import React, { Component } from 'react';
import './style.css';

class User extends Component {
  constructor(props) {
    super(props);
    const { username } = this.props.match.params;
    this.state = {
      username: username
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>{this.state.username}</h2>
        </div>
      </div>
    );
  }
}

export default User;
