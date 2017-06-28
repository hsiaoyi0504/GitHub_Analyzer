import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import {HorizontalBar} from 'react-chartjs-2';
import User from './User';

class Piechart extends Component{

    constructor(props){
        super(props);
        this.state = {reoplist : this.props.reoplist}
    }


    render(){

        const data = {labels: [
		'Red',
		'Green',
		'Yellow',
        'blue'
	    ],
        datasets: [{
		data: [300, 150, 100,75],
		backgroundColor: [
        '#FF6384',
        '#33FFAA',
		'#FFCE56',
        '#36A2EB'
		],
		hoverBackgroundColor: [
		'#FF6384',
        '#33FFAA',
		'#FFCE56',
        '#36A2EB'
        		]
	}]
        };
    return(
    <div>
        <div>
        <h2>Piechart Example</h2>
        <Doughnut data={data} />
        </div>
    </div>);
    }

}

export default Piechart;