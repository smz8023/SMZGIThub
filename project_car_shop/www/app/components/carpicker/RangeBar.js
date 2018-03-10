import React from "react";
import {Row , Col , Tag , Checkbox , Button , Slider} from "antd";
import { connect } from "dva";
 
 
class RangeBar extends React.Component{
	constructor({cname , options , min , max}){
		super();

		this.state = {
			"a" : 20 ,
			"b" : 100
		}
	 
	}

	render(){
		return <div>
			<Row>
				<Col span={1}>
					<b>{this.props.cname}：</b>
				</Col>
				<Col span={12}>
					<Slider 
						range 
						defaultValue={[this.state.a , this.state.b]} 
						min={this.props.min} 
						max={this.props.max} 
						onChange={(value)=>{this.setState({"a":value[0] , "b" : value[1]})}}
					/>
				</Col>
				<Col span={1}>
					<Button  
						type="primary" 
						onClick={()=>{this.props.dispatch({"type":"carpicker/addfilter" , "value" : this.state , "name" : this.props.name})}}
					>确定</Button>
				</Col>
			</Row>
			
			
		</div>
	}
}

export default connect(
	({carpicker})=>{
		return {
			carpicker
		}
	}
)(RangeBar);