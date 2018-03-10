import React from "react";
import {Row , Col , Tag , Checkbox , Button , DatePicker } from "antd";
import { connect } from "dva";
import _ from "underscore";
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
import moment from 'moment';
 
class DateBar extends React.Component{
	constructor({cname , min , max}){
		super();

	 	this.state = {
	 		"a" : min ,
	 		"b" : max
	 	}
	}

	 
	render(){
		return <div>
			<b>{this.props.cname}：</b>
			<RangePicker
			      defaultValue={[moment(this.props.min, dateFormat), moment(this.props.max, dateFormat)]}
			      format={dateFormat}
			      onChange={(value)=>{this.setState({"a" : value[0]._i , "b" : value[1]._i})}}
		    />
		    {" "}
		    <Button type="primary" onClick={()=>{this.props.dispatch({"type":"carpicker/addfilter","name" : this.props.name , "value" : this.state})}}>确定</Button>
		</div>
	}
}

export default connect(
	({carpicker})=>{
		return {
			carpicker
		}
	}
)(DateBar);