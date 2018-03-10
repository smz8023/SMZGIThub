import React from "react";
import {Row , Col , Tag , Checkbox , Button} from "antd";
import { connect } from "dva";
import _ from "underscore";
 
class CheckBoxBar extends React.Component{
	constructor({cname , options}){
		super();

		//复选框的题目的答案，一定是一个数组
		this.state = {
			value : []
		}	
	}

	//改变复选框的时候的事件处理函数
	changeHandler(e , option){
		//如果是true就把这个项目push进去，否则就删除这项
		//克隆这项
		var _value = _.clone(this.state.value);
		if(e.target.checked){
			//推入这项
			_value.push(option);
			//这里求了一个交集，目的是为了规整顺序
			this.setState({
				"value" : _.intersection(this.props.options , _value)
			});
		}else{
			this.setState({
				"value" : this.state.value.filter((item)=>{
					return item != option
				})
			});
		}
	}

	submithandler(){
		if(this.state.value.length == 0){
			alert("至少选择一个" + this.props.cname);
			return;
		}
		this.props.dispatch({"type":"carpicker/addfilter" , "value" : this.state.value , "name" : this.props.name})
	}

	render(){
		return <div>
			<b>{this.props.cname}：</b>
			{
				this.props.options.map((option , index) => {
					return <Checkbox key={index} onChange={(e)=>{this.changeHandler(e,option)}}>{option}</Checkbox>
				})
			}
			<Button  
				type="primary" 
				onClick={this.submithandler.bind(this)}
				>确定</Button>
		</div>
	}
}

export default connect(
	({carpicker})=>{
		return {
			carpicker
		}
	}
)(CheckBoxBar);