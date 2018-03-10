import React from "react";
import { connect } from "dva";
 import { Router, Route } from 'dva/router';
import CarPicker from "./CarPicker.js";
import PicShow from "./PicShow.js";

class App extends React.Component{
	constructor(){
		super();
	}

	componentDidMount(){
		
	}

	render(){
		return <div>
	    	<Router history={history}>
				<Route path="/" component={CarPicker} />
				<Route path="/picshow" component={PicShow} />
	    	</Router>
		</div>
	}
}

export default App;