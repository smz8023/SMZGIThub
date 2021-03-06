import React from "react";
import { connect } from "dva";
import {Row , Col } from "antd";
import FilterTag from "./FilterTag.js";

import "./FilterIndicator.less";
 
class FilterIndicator extends React.Component{
	constructor({carpicker}){
		super();
	}

	ccc(){

	}
  

	render(){
		return <div>
			{
				this.props.carpicker.filters.length == 0 
				?
				<div></div>
				:
				<div>
					<b>当前筛选：</b>
					{
						this.props.carpicker.filters.map((item , index)=>{
							return <FilterTag key={index} item={item}></FilterTag>
						})
					}
				</div>
			}
		</div>
	}
}

export default connect(
	({carpicker})=>{
		return {
			carpicker
		}
	}
)(FilterIndicator);