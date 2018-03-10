import React from "react";
import {Row , Col , Tag} from "antd";
import { connect } from "dva";

class FilterTag extends React.Component{
	constructor({item , dispatch}){
		super();

		
	}

	closeHandler(e) {
		  e.preventDefault();
		  this.props.dispatch({"type" : "carpicker/delfilter" , "name" : this.props.item.name})
	}

	//中文名字
	cname(){
		switch(this.props.item.name){
			case "seat" :
				return "座位数";
			case "country" :
				return  "产地";
			case "price" :
				return "售价";
			case "brand" :
				return "品牌";
			case "date" :
				return "上市日期";
			case "type" :
				return "类型";
		}
	}

	//描述词
	v(){
		var value = this.props.item.value;
		switch(this.props.item.name){
			case "seat" :
				value = value.map((v)=>{
					return v + "座";
				});
				return value.join(" 或 ");
			case "country" :
			case "brand" :
			case "type" :
				return value.join(" 或 ");
			case "price" :
				return `${value.a}万 到 ${value.b}万`;
			case "date" :
				return `${value.a} 到 ${value.b}`;
		}
	}

	render(){
		return <Tag closable onClose={this.closeHandler.bind(this)}>
			<b>{this.cname()}：</b>

			{this.v()}
		</Tag>
	}
}

export default connect(
	({carpicker})=>{
		return {
			carpicker
		}
	}
)(FilterTag);