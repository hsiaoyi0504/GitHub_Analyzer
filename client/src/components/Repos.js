import React, { Component } from 'react';
import './style.css';

class Repos extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: {},
        isFetched: false
    }
  }

  componentWillMount() {
    fetch(`https://api.github.com/search/repositories?q=user:${this.props.username}&sort=star&order=desc`)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        this.setState({ data: data, isFetched: true });
    })
    .catch(error => 'oops i did it again...');
  }

  render() {
    // console.log(this.state.data.items);
    let repos = this.state.data.items;
    // console.log(repos);
    if(!this.state.isFetched) return(
        <div>Loading...</div>
    );
    else return(
      <div>
        <ul>
        {repos.map(d => 
          <li key={d.id}><a href={d.html_url} target="_blank"><i>{d.full_name}</i><span> {d.stargazers_count}</span></a></li>
        )}
        </ul>
      </div>  
    );
  }
}

export default Repos;