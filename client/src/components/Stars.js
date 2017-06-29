import React, { Component } from 'react';
import './style.css';
import parseString from '../utils/parseString';

class Stars extends Component {
  constructor(props) {
    super(props);
    //const { username } = this.props.uName;
    this.state = {
      //username: username,
      pageNum: '1',
      data: []
    }
  }

  componentWillMount() {
      // console.log('willmount' + this.props.uName);
      fetch(`https://api.github.com/users/${this.props.uName}/starred?per_page=1`)
      .then(res => {
          // console.log('idothingshere');
          // console.log(res.headers.get('Link'));
          let tmpstr = '';
          tmpstr = res.headers.get('Link');
          this.setState({ pageNum: parseString(tmpstr) })
          return res.json();
      })
      .then(data => {
        this.setState({ data });
      })
      .catch(err => console.log('catch err..'));
  }

  render() {
    //console.log(this.props.uName);
    // console.log(this.state.pageNum);
    let starLink = `https://github.com/${this.props.uName}?tab=stars`;
    return (
      <a href ={starLink} target="_blank" title="Repos Starred by User"><i>{this.state.pageNum}</i></a>
    );
  }
}

export default Stars;