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
    let repos = this.state.data.items;
    if(!this.state.isFetched) return(
        <div>Loading...</div>
    );
    else return(
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Stars</th>
            </tr>
          </thead>
          <tbody>
            {repos.map(d =>
              <tr key={d.id}>
                <td><a href={d.html_url} target="_blank"><i>{d.full_name}</i></a></td>
                <td>{d.stargazers_count}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>  
    );
  }
}

export default Repos;