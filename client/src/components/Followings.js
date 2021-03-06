/* eslint
no-console: "off",
no-underscore-dangle: "off" */
import React, { Component } from 'react';
import './style.css';

class Followings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      isWait: true,
      followings: [],
    };
  }

  componentWillMount() {
    fetch(this.state.url)
    .then(res => res.json())
    .then(followings =>
      this.setState({
        followings: followings,
        isWait: false,
      })
    )
    .catch(error => console.log("opps"));
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      url: nextProps.url,
      isWait: true,
      followings: [],
    };
    
    fetch(this.state.url)
    .then(res => res.json())
    .then(followings =>
      this.setState({
        followings: followings,
        isWait: false,
      })
    )
    .catch(error => console.log("opps"));
  }

  render() {
    if(this.state.isWait) {
      return (
        <div className="followings">
          <h4>Followings</h4>
          <div>
            <div>Fetching...</div>
          </div>
        </div>
      );
    } else {
      if (this.state.followings.length === 0) {
        return (
          <div className="followings">
            <h4>Followings</h4>
            <div>
              <div>No one follows.</div>
            </div>
          </div>
        );
      } else {
        const followings = this.state.followings.map(
          following => (<a key={following.id} href={'/user/'+following.login}><img className="following" src={following.avatar_url} alt={following.login} /></a>)
        );
        return (
          <div className="followings">
            <h4>Followings</h4>
            <div>{followings}</div>
          </div>
        );
      }
    }
  }
}

export default Followings;
