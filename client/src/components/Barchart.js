import React, {Component} from 'react';
import {HorizontalBar} from 'react-chartjs-2';

class Bar extends Component{

    constructor(props){
        super(props);
        this.state = {
            languageList:[],
            languageCnt:[],
            pagecnt: props.pageCnt,
            username : props.userName,
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
    console.log(this.state.url+this.state.pagecnt)
    for(var i = 1;i<=this.state.pagecnt;i++){
    fetch(this.state.url+this.state.pagecnt)
    .then(res => res.json())
    .then( reposlist=>{
      var nameList = [];
      var lanCnt = [];
      var lan = [];
      for(var i = 0;i<reposlist.length;i++){
          nameList.push(reposlist[i].name);
          const lanIdx = lan.indexOf(reposlist[i].language);
          if(lanIdx!== -1&&this.state.totalLan.indexOf(reposlist[i].language)!==-1){
            lanCnt[lanIdx] +=1;
        }else if(this.state.totalLan.indexOf(reposlist[i].language)!==-1){
            lan.push(reposlist[i].language);
            lanCnt.push(1);
            }
        }
      this.setState({
        languageList:lan,
        languageCnt:lanCnt,
        isFetch:true
      })
       
      console.log(this.state.languageList);
      console.log(this.state.languageCnt);
      
    })
    .catch(error => console.log(error));

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
            console.log(idx)
            bgcl.push(colorList[this.state.totalLan.indexOf(this.state.languageList[idx])]);
        }
        console.log(bgcl)
        var i = 0;
        const data = {labels: this.state.languageList,
        datasets: [{
        label:'language barchart',
		data: this.state.languageCnt,
		backgroundColor: bgcl,
        borderColor: 'rgba(255,99,132,0.2)',
        borderWidth: 1,
		hoverBackgroundColor: bgcl	}]
        };
        const options = {
            legend:{ 

            },
            layout:{
                padding:{
                    left:10,
                    reight:10,
                    top:0,
                    bottom:0
                },
            },
            xAxisID:'abcd',
            categoryPercentage: 0.5,

        }
        const wd = 10;
        const ht = 2;
    return(
    
    <div>
        <div>
        <h2>Piechart Example</h2>
        <HorizontalBar data={data} options={options}  width={wd} height={ht} />
        </div>
    </div>);
    }

}

export default Bar;