/* eslint
no-console: "off",
no-underscore-dangle: "off" */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Image, ControlLabel, Button, Form, FormControl } from 'react-bootstrap';
import './style.css';
import logo from '../img/logo.png';

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
          <Image src={logo} responsive/>
        </div>
        <div className="App-content">
          <Form onSubmit={this.handleSubmit} inline>
            {/*<ControlLabel>User name: </ControlLabel>*/}
            <FormControl type="text" placeholder="Enter GitHub ID" bsSize="lg" value={this.state.value} onChange={this.handleChange} />
            <Button type="submit" bsSize="lg">Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Home;
