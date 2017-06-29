import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';

class Piechart extends Component{

    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            languageList:[],
            reposname:[],
            languageCnt:[],
            pagecnt: props.pageCnt,
            username : props.userName,
            repoTime:[],
            repoCnt:0,
            url: `https://api.github.com/users/${props.userName}/repos?per_page=100&page=`,
            isFetch:false,
            totalLan:["JavaScript","Java","Python","CSS","PHP","Ruby","C++","C","HTML",
                        "shell","C#","Objective-C","R","VimL","Go","Perl","CoffeeScript",
                        "Tex","Swift","Scala","Emacs Lisp","Haskell","Lua","Clojure",
                        "Matlab","Arduino","Groovy","Puppet","Rust","PowerShell","Erlang",
                        "Visual Basic","Processing","Assembly","TypeScript","XSLT","ActionScript",
                        "ASP","OCaml","D","Scheme","Dart","Common Lisp","Julia","F%",
                        "Elixir","FORTRAN","Haxe","Racket","Logos"]
        }
    }


    componentWillMount() {
        // console.log(this.state.pagecnt);
    for(var i = 1;i<=this.state.pagecnt;i++){
    console.log(this.state.url+i)
    fetch(this.state.url+i)
    .then(res => res.json())
    .then( reposlist=>{
      var lanCnt = [];
      var lan = [];
      for(var i = 0;i<reposlist.length;i++){
          const lanIdx = lan.indexOf(reposlist[i].language);
          if(lanIdx!== -1&&this.state.totalLan.indexOf(reposlist[i].language)!==-1){
            lanCnt[lanIdx] +=1;
        }else if(this.state.totalLan.indexOf(reposlist[i].language)!==-1){
            lan.push(reposlist[i].language);
            lanCnt.push(1);
        }
      }
        console.log(reposlist)
        const time = reposlist[0].created_at;
        const userName = this.state.username;
        const repoName = reposlist[0].name;
        const language = reposlist[0].language;
        fetch('/api/recommendation',{
        method: 'post',
        headers:{Accept:'application/json','Content-Type':'application/json'},
            body: JSON.stringify({
                time: JSON.stringify(time),
                userName: userName,
                repoName: repoName,
                language: language,
            }),
        }).then(res=>res.json())
        .then((res)=>{console.log(res)})
        .catch(error=>console.log(error))
      

        this.setState({
        languageList:lan,
        //languageOrder:order,
        languageCnt:lanCnt,
        isFetch:true,
        //repoCnt:reposlist.length,
        //repoTime:repoTime,
        //reposname:nameList
      });
      
    })


    .catch(error => console.log(error));
    }
  }
    
    handlePost(){
        console.log(this.state.repoTime);
        for(var i = 0;i <this.state.repoCnt;i++){
        const repoTime=this.state.repoTime[i];
        const userName=this.state.username;
        const repoName=this.state.reposname[i];
        const language=this.state.order[i];
         fetch('/api/recommendation',{
            method: 'post',
            headers:{Accept:'application/json','Tontent-Type':'application/json'},
            body: JSON.stringify({
                repoTime,
                userName,
                repoName,
                language,
            }),
        }).then(res=>res.json())
        .then((res)=>{console.log(res)})
        .catch(error=>console.log(error))
    }
    }


    render(){
        const colorList=["#682205","#b2999a","#4319fb","#4df573","#528ce0","#e21db2","#f9a813","#a2696e","#904f02","#1744f8",
                        "#d196c6","#d38141","#556760","#0543ce","#57a0f0","#960d2c","#02e065","#5c687b","#d00a5f","#ccdb1d",
                        "#679d92","#db7da5","#1ef0c8","#4c5707","#3c9811","#b01d1a","#fbffde","#8248d5","#2d6c1c","#8678fb",
                        "#02d728","#7d70fb","#15d0cc","#8edc39","#eb948d","#b56afc","#8d178c","#4e30fa","#76d530","#543413",
                        "#712148","#e533f7","#82b0c5","#737515","#43af83","#50fc2e","#42637c","#c4ba1a","#d163ed","#57523c"]
        let bgcl=[];
        for(var idx in this.state.languageList){
        //    console.log(idx)
            bgcl.push(colorList[this.state.totalLan.indexOf(this.state.languageList[idx])]);
        }
        //console.log(bgcl)
        var i = 0;
        const data = {labels: this.state.languageList,
        datasets: [{
		data: this.state.languageCnt,
		backgroundColor: bgcl,
		hoverBackgroundColor: bgcl	}]
        };

        //console.log(this.state.repoTime);
        

    
        const wd = 30;
        const ht = 10;
    return(<Doughnut data={data}  width={wd} height={ht}/>);
    }

}

export default Piechart;
