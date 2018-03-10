import React from "react";
import { connect } from "dva";
import {Row , Col , Layout , Menu, Breadcrumb , Icon} from "antd";
const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
import "./CarPicker.less";
import FilterIndicator from "../components/carpicker/FilterIndicator.js";
import CheckBoxBar from "../components/carpicker/CheckBoxBar.js";
import RangeBar from "../components/carpicker/RangeBar.js";
import DateBar from "../components/carpicker/DateBar.js";
import CarDataBox from "../components/carpicker/CarDataBox.js";
import classnames from "classnames";

class CarPicker extends React.Component{
	constructor({carpicker , dispatch}){
		super();

		dispatch({"type" : "carpicker/init"});
	}

 	onChange(date, dateString) {
  		 
	}


	render(){
		return <div>
			<Layout className="layout">
				<Header>
					<div className="logo" ></div>
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={['1']}
						style={{ lineHeight: '64px' }}
					>
						<Menu.Item key="1">汽车筛选</Menu.Item>
					</Menu>
				</Header>

				<Content style={{ padding: '0 50px' }}>
					<Breadcrumb style={{ margin: '12px 0' }}>
						<Breadcrumb.Item>首页</Breadcrumb.Item>
						<Breadcrumb.Item>汽车筛选</Breadcrumb.Item>
					</Breadcrumb>

					<div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
						<FilterIndicator></FilterIndicator>

						<div className="filterbar" style={{"display" : this.props.carpicker.filternames.includes("country") ? "none" : "block"}}>
						 	<CheckBoxBar
						 		name="country"
						 		cname="产地"
						 		options={["国产","美国","法国","德国","日本","其他"]}
						 	></CheckBoxBar>
						</div>

						<div className="filterbar"  style={{"display" : this.props.carpicker.filternames.includes("brand") ? "none" : "block"}}>
						 	<CheckBoxBar
						 		name="brand"
						 		cname="品牌"
						 		options={this.props.carpicker.brandoptions}
						 	></CheckBoxBar>
						</div>

						<div className="filterbar"  style={{"display" : this.props.carpicker.filternames.includes("seat") ? "none" : "block"}}>
						 	<CheckBoxBar
						 		name="seat"
						 		cname="座位数"
						 		options={["2","4","5","7","更多"]}
						 	></CheckBoxBar>
						</div>

						<div className="filterbar" style={{"display" : this.props.carpicker.filternames.includes("type") ? "none" : "block"}}>
						 	<CheckBoxBar
						 		name="type"
						 		cname="类型"
						 		options={["轿车","小型SUV","中型SUV","大型SUV","挖掘机"]}
						 	></CheckBoxBar>
						</div>

						<div className="filterbar" style={{"display" : this.props.carpicker.filternames.includes("price") ? "none" : "block"}}>
						 	<RangeBar
						 		name="price"
						 		cname="售价"
						 		min={2}
						 		max={300}
						 	></RangeBar>
						</div>

						<div className="filterbar" style={{"display" : this.props.carpicker.filternames.includes("date") ? "none" : "block"}}>
						 	<DateBar
						 		name="date"
						 		cname="发布日期"
						 		min="2008-01-01"
						 		max="2017-01-01"
						 	></DateBar>
						</div>
					</div>

					<div style={{backgroundColor : "white" , padding: 24, minHeight: 280 }}>
						<CarDataBox></CarDataBox>
					</div>
				</Content>

				<Footer style={{ textAlign: 'center' }}>
					考拉汽车平台 &copy; 2017
				</Footer>
			</Layout>
		</div>
	}
}

export default connect(
	({carpicker})=>{
		return {
			carpicker
		}
	}
)(CarPicker);