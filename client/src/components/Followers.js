/* eslint
no-console: "off",
no-underscore-dangle: "off" */
import React, { Component } from 'react';
import './style.css';

class Followers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      isWait: true,
      followers: [],
    };
  }

  componentWillMount() {
    fetch(this.state.url)
    .then(res => res.json())
    .then(followers =>
      this.setState({
        followers: followers,
        isWait: false,
      })
    )
    .catch(error => console.log("opps"));
  }

  render() {
    if(this.state.isWait) {
      return (
        <div className="followers">
          <h4>Followers</h4>
          <div>
            <div>Fetching...</div>
          </div>
        </div>
      );
    } else {
      if (this.state.followers.length === 0) {
        return (
          <div className="followers">
            <h4>Followers</h4>
            <div>
              <div>No follower.</div>
            </div>
          </div>
        );
      } else {
        const followers = this.state.followers.map(
          follower => (<a href={'/user/'+follower.login} key={follower.id}><img className="follower" src={follower.avatar_url} alt={follower.login} /></a>)
        );
        return (
          <div className="followers">
            <h4>Followers</h4>
            <div>{followers}</div>
          </div>
        );
      }
    }
  }
}

export default Followers;
