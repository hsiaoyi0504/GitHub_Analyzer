/* eslint
no-console: "off",
no-underscore-dangle: "off" */
import React, { Component } from 'react';
import './style.css';
import Stars from './Stars';
import Followers from './Followers';
import Followings from './Followings';

class User extends Component {
  constructor(props) {
    super(props);
    const { username } = this.props.match.params;
    this.state = {
      username: username,
      user: {},
      isFetched: false,
    };
  }

  componentDidMount() {
    fetch(`https://api.github.com/users/${this.state.username}`)
    .then(res => res.json())
    .then(user => {
      this.setState({ user: user, isFetched: true });
    })
    .catch(error => console.log('ooops'))
  }
  
  renderBasicProfile() {
    const user = this.state.user;
    return(
      <div className="user-profile">
        <a href={user.html_url} target="_blank" title={user.name || user.login}>
          <img src={user.avatar_url}/>
        </a>
        <h2>
          <a href={user.html_url} title={user.login} target="_blank">{user.name || user.login}</a>
        </h2>
        <h3>{user.location || 'I Live In My Mind'}</h3>
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
        <ul>
          <li>
            <a href={followers} target="_blank" title="Number Of Followers"><i>{user.followers}</i><span>Followers</span></a>
          </li>
          <li>
            <a href={repos} target="_blank" title="Number Of Repositoriy"><i>{user.public_repos}</i><span>Repositoriy</span></a>
          </li>
          <li>
            <a href={following} target="_blank" title="Number Of Following"><i>{user.following}</i><span>Following</span></a>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    if (this.state.isFetched) {
      if (this.state.user.message === "Not Found"){
        return (
          <div className="App">
            <div className="App-header">
              <h2>User Not found</h2>
            </div>
          </div>
        );
      } else{
        return (
          <div className="App">
            <div className="App-header">
              <h2>{this.state.username}</h2>
            </div>
            <div className="App-content">
              {this.renderBasicProfile()}
              {this.renderStat()}
              <Stars uName={this.state.username}/>
              <Followers url={this.state.user.followers_url} />
              <Followings url={'https://api.github.com/users/'+this.state.username+'/following'} />
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="App">
          <div className="App-header">
            <h2>Fetching User Information ...</h2>
          </div>
        </div>
      );
    }
  }
}

export default User;
