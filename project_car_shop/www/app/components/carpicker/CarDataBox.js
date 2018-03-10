import React from "react";
import {Row , Col , Button , Table} from "antd";
import { connect } from "dva";
import { routerRedux } from 'dva/router';
 

class CarDataBox extends React.Component{
	constructor({carpicker , dispatch}){
		super();

		this.state = {
			cols :  [
				{
					title : '图片',
					dataIndex : 'pic',
					key : 'pic',
					render(text , record , index){
						return <a href="javascript:;"  onClick={()=>{dispatch(routerRedux.push("/picshow/" + record.picdir))}}><img src={`carpic/${text}`} width="90"  /></a>
					},
					width : 140
				},
				{
				  title: '型号',
				  dataIndex: 'model',
				  key: 'model',
				  sorter : true
				}, 
				{
				  title: '品牌',
				  dataIndex: 'brand',
				  key: 'brand',
				  sorter : true
				},
				{
				  title: '类型',
				  dataIndex: 'type',
				  key: 'type',
				  sorter : true
				},
				{
				  title: '产地',
				  dataIndex: 'country',
				  key: 'country',
				  sorter : true
				},
				{
				  title: '座位数',
				  dataIndex: 'seat',
				  key: 'seat',
				  sorter : true
				},
				{
				  title: '售价',
				  dataIndex: 'price',
				  key: 'price' ,
				  sorter : true
				},
				{
				  title: '上市日期',
				  dataIndex: 'date',
				  key: 'date' ,
				  sorter : true
				},
				{
				  title: '操作',
				  key: 'manipulate',
				  render(text , record){

				  	return <div>
				  		<Button onClick={()=>{dispatch(routerRedux.push("/picshow/" + record.picdir))}}>查看图集</Button>
				  	</div>
				  }
				}
			],
			cars : []
		}
	}

	componentWillReceiveProps({carpicker}){
		this.setState({
			"cars" : carpicker.cars
		});
	}

	//点击分页条之后做的事情
	onchangehandler(pagination,filters,sorter){
		this.props.dispatch({
			type : "carpicker/changepage" , 
			page : pagination.current , 
			pageSize : pagination.pageSize,
			field : sorter.field || "id",
			order : sorter.order || "ascend"
		});
	}

	onShowSizeChangehandler(page, pageSize){
		this.props.dispatch({
			type : "carpicker/changepage" , 
			page  ,
			pageSize  
		});
	}

	 
	render(){
		return <div>
			<p>共找到{this.props.carpicker.paginations.total}种车符合您的要求</p>
			<br/>
			<Table 
				dataSource={this.state.cars} 
				columns={this.state.cols} 
				rowKey="id"
				pagination={{
					current:this.props.carpicker.paginations.current,
					total:this.props.carpicker.paginations.total ,
					pageSize:this.props.carpicker.paginations.pageSize,
					onShowSizeChange : (page, pageSize)=>{
						this.onShowSizeChangehandler(page, pageSize)
					},
					showSizeChanger : true,
					pageSizeOptions : ['5','10','50','100']
				}}
				onChange={(pagination, filters , sorter)=>{
					this.onchangehandler(pagination , filters , sorter)
				}}
			/>
		</div>
	}
}

export default connect(
	({carpicker})=>{
		return {
			carpicker
		}
	}
)(CarDataBox);