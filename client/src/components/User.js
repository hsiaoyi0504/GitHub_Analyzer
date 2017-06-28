/* eslint
no-console: "off",
no-underscore-dangle: "off" */
import React, { Component } from 'react';
import Piechart from './piechart';
import './style.css';

class User extends Component {
  constructor(props) {
    super(props);
    const { username } = this.props.match.params;
    this.state = {
      username: username,
      user: {},
      repos: {}
    };
  }

  componentWillMount() {
    fetch(`https://api.github.com/users/${this.state.username}`)
    .then(res => res.json())
    .then(user =>
      //console.log(user);
      this.setState({ user })
    )
    .catch(error => console.log(error))
  
    fetch(`https://api.github.com/users/${this.state.username}/repos`)
    .then(res=> res.json())
    .then(repos => {this.setState({repos});})
    .catch(error => console.log(error));

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
    console.log(this.state.user.html_url);
    console.log(this.state.user.starred_url);
    const user = this.state.user;
    const repoList = this.state.repos;
    console.log(this.state.repos);
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
          <li>
            <a target="_blank" title="name of repos"><i>{repoList["name"]}</i><span>repo</span></a>
          </li>
          <Piechart />
          </ul>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>{this.state.username}</h2>
        </div>
        {this.renderBasicProfile()}
        {this.renderStat()}
      </div>
    );
  }
}

export default User;
