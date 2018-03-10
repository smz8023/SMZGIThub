import React from "react";
import { connect } from "dva";
import "./PicShow.less";

import Filter from "../components/picshow/Filter.js";
import PicNav from "../components/picshow/PicNav.js";
import BigPic from "../components/picshow/BigPic.js";
 
class PicShow extends React.Component{
	constructor({picshow , dispatch , params}){
		super();
	}

	componentDidMount(){
		//拉取数据
		this.props.dispatch({
			"type" : "picshow/init" , 
			"cartype" : this.props.params.type
		});
	}

	render(){
		return <div className="picshowwrap">
			<div className="bigpicbox">
				<BigPic></BigPic>
			</div>
			<div className="rightPart">
				<div className="filterbox">
					<Filter></Filter>
				</div>

				<div className="cl"></div>
				
				<div className="picnavbox">
					<PicNav></PicNav>
				</div>
			</div>

		</div>
	}
}

export default connect(
	({picshow})=>{
		return {
			picshow
		}
	}
)(PicShow);