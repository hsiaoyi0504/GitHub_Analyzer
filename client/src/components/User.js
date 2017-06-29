/* eslint
no-console: "off",
no-underscore-dangle: "off" */
import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Piechart from './Piechart';
import Bar from './Barchart';
import './style.css';
import Stars from './Stars';
import Followers from './Followers';
import Followings from './Followings';
import Repos from './Repos';

class User extends Component {
  constructor(props) {
    super(props);
    const { username } = this.props.match.params;
    this.state = {
      username: username,
      user: {},      
      isFetched: false
    };
  }

  componentWillMount() {
    fetch(`https://api.github.com/users/${this.state.username}`)
    .then(res => res.json())
    .then(user => {
      // let repoUrl=`https://api.github.com/users/${this.state.username}/repos?per_page=100`;
      this.setState({user: user, isFetched: true});
    })
    .catch(error => console.log(error))
  }
  

  renderBasicProfile() {
    const user = this.state.user;
    return(
      <div className="user-profile">
        <img alt="user-profile-img" className="user-profile-img" src={user.avatar_url}/>
        <h3>{user.name || user.login}</h3>
        <h5>{user.location || 'I Live In My Mind'}</h5>
      </div>
    );
  }

  renderStat() {
    const user = this.state.user;
    let followers = `${user.html_url}/followers`;
    let repos = `${user.html_url}?/tab=repositories`;
    let following = `${user.html_url}/following`;
    return(
      <div className="user-stats">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Followers</th>
              <th>Repos</th>
              <th>Folloing</th>
              <th>Stars</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href={followers} target="_blank" title="Number Of Followers"><i>{user.followers}</i></a></td>
              <td><a href={repos} target="_blank" title="Number Of Repositoriy"><i>{user.public_repos}</i></a></td>
              <td><a href={following} target="_blank" title="Number Of Following"><i>{user.following}</i></a></td>
              <td><Stars uName={this.state.username}/></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    if (this.state.isFetched) {
      if (this.state.user.message === "Not Found"){
        return (
          <div className="App">
            <div className="App-header">
              <h2>GitHub Analyzer</h2>
            </div>
            <div className="App-content">
              User Not found
            </div>
          </div>
        );
      } else{
        const pageCnt = Math.ceil(this.state.user.public_repos/100);
        return (
          <div className="App">
            <div className="App-header">
              <h2>GitHub Analyzer</h2>
            </div>
            <div className="App-content">
              <Col xs={12} md={4}>
                {this.renderBasicProfile()}
                {this.renderStat()}
              </Col>
              <Col xs={12} md={8}>
                <h4>Language Usage</h4>
                <Piechart userName={this.state.username} pageCnt={pageCnt} />
                <Bar userName={this.state.username} pageCnt={pageCnt} />
              </Col>
              <Col xs={12} mdOffset={3} md={6}>
                <Repos username={this.state.username}/>
              </Col>
              <Col xs={12} md={6}>
                <Followers url={this.state.user.followers_url} />
              </Col>
              <Col xs={12} md={6}>
                <Followings url={'https://api.github.com/users/'+this.state.username+'/following'} />
              </Col>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="App">
          <div className="App-header">
            <h2>GitHub Analyzer</h2>
          </div>
          <div className="App-content">
            Fetching User Information ...
          </div>
        </div>
      );
    }
  }
}

export default User;
