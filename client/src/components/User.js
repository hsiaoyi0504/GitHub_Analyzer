/* eslint
no-console: "off",
no-underscore-dangle: "off" */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Col, Form, FormControl, Button } from 'react-bootstrap';
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
      isFetched: false,
      value: '',
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayRepos = this.displayRepos.bind(this);
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

  componentWillReceiveProps(nextProps) {
    const { username } = nextProps.match.params;

    this.state = {
      username: username,
      user: {},      
      isFetched: false,
      value: '',
      redirect: false
    };

    fetch(`https://api.github.com/users/${this.state.username}`)
    .then(res => res.json())
    .then(user => {
      // let repoUrl=`https://api.github.com/users/${this.state.username}/repos?per_page=100`;
      this.setState({user: user, isFetched: true});
    })
    .catch(error => console.log(error))
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({redirect: true});
    event.preventDefault();
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

  // renderPieChart(){
  //   const totalLan = ["JavaScript","Java","Python","CSS","PHP","Ruby","C++","C","HTML",
  //                       "shell","C#","Objective-C","R","VimL","Go","Perl","CoffeeScript",
  //                       "Tex","Swift","Scala","Emacs Lisp","Haskell","Lua","Clojure",
  //                       "Matlab","Arduino","Groovy","Puppet","Rust","PowerShell","Erlang",
  //                       "Visual Basic","Processing","Assembly","TypeScript","XSLT","ActionScript",
  //                       "ASP","OCaml","D","Scheme","Dart","Common Lisp","Julia","F%",
  //                       "Elixir","FORTRAN","Haxe","Racket","Logos"]
  //   let lanCnt=[];
  //   let lan = [];
  //   for(var i = 1; i<=Math.ceil(this.state.user.public_repos/100);i++){
  //     console.log(`https://api.github.com/users/${this.state.username}/repos?per_page=100&page=${i}`)
  //     fetch(`https://api.github.com/users/${this.state.username}/repos?per_page=100&page=${i}`)
  //     .then(res => res.json())
  //     .then(reposlist=>{
  //       for(var i = 0;i<reposlist.length;i++){
  //         const lanIdx = lan.indexOf(reposlist[i].language);
  //         if(lanIdx!== -1&&totalLan.indexOf(reposlist[i].language)!==-1){
  //           lanCnt[lanIdx]+=1;
  //         }else if(totalLan.indexOf(reposlist[i].language)!==-1){
  //           //console.log(reposlist[i].language);
  //           lan.push(reposlist[i].language);
  //           lanCnt.push(1);
  //         }
  //       }

  //     })
  //   }
  //   console.log(lan);
  //   console.log(lanCnt);
  //   return(
  //     <div>
  //       <Piechart lanlist={lan} lanCnt={lanCnt}/>
  //     </div>
  //   )
  // }

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

  displayRepos() {
    if(this.state.user.public_repos === 0) {
      return(
        <p>None to display.</p>
      );
    }
    else {
      return(
        <Repos username={this.state.username}/>
      );
    }
  }

  render() {
    if(this.state.redirect){
      return <Redirect push to={"/user/"+this.state.value} />;
    }
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
              <Form onSubmit={this.handleSubmit} inline>
                {/*<ControlLabel>User name: </ControlLabel>*/}
                <FormControl type="text" placeholder="Enter GitHub ID" bsSize="sm" value={this.state.value} onChange={this.handleChange} />
                <Button type="submit" bsSize="sm">Submit</Button>
              </Form>
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
                {this.displayRepos()}
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
