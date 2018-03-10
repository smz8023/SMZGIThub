import React from "react";
import { connect } from "dva";
import classnames from "classnames";

import "./PicNav.less";

class PicNav extends React.Component{
	constructor({picshow}){
		super();

		this.state = {
			"pageAmount" : 0 ,
			"pagecur" : 0
		}
	}

	//生命周期
	componentDidMount(){
		//事件委托
		var $unit = $(this.refs.unit);
		var self = this;
		$(this.refs.pager).delegate("li" , "mouseenter" , function(){
			$unit.stop(true).animate({"left" : -336 * $(this).index()},400);
			//改变内部状态标记的当前页码。
			self.setState({
				"pagecur" : $(this).index()
			});
		});
	}

	componentWillReceiveProps(nextProps){
		if(
			nextProps.picshow.nowcolor != this.props.picshow.nowcolor
			||
			nextProps.picshow.nowtype != this.props.picshow.nowtype
		){
			this.setState({
				"pagecur" : 0
			});
			var $unit = $(this.refs.unit);
			$unit.stop(true).animate({"left" : 0},400);
		}
		
		if(
			parseInt(nextProps.picshow.nowidx / 6) != this.state.pagecur
		){
			this.setState({
				"pagecur" : parseInt(nextProps.picshow.nowidx / 6)
			});
			var $unit = $(this.refs.unit);
			$unit.stop(true).animate({"left" : -316 * parseInt(nextProps.picshow.nowidx / 6)},400);
		}
	}

	//pager的li
	showPagerLis(pageamount){
		//计算宽度
		var w = (316 - 4 * (pageamount - 1)) / pageamount;
		//填充数组
		var arr = [];
		var count = 0;
		while(count != pageamount){
			arr.push(<li className={classnames({"cur" : this.state.pagecur == count})} key={count} style={{"width" : `${w}px`}}></li>)
			count++;
		}
		return arr;
	}
		
	render(){
		//这里拆分6项、6项、6项、6项的图片
		if(this.props.picshow.data.colors){
			var picshow = this.props.picshow;
			var images = picshow.data.colors[picshow.colors[picshow.nowcolor]].types[picshow.types[picshow.nowtype]];
			
			 
			var pageAmount = Math.ceil(images.length / 6);

			var picarr = [];
			 
			for(var i = 0 ; i < pageAmount ; i++){
				var temp = images.slice(6 * i , 6 * (i + 1));
				picarr.push(temp);
			} 
		}
		 

		//得到车辆名字、当前颜色（字符串）、图集类型（字符串）
		var carname = this.props.picshow.data.name;
		var color = this.props.picshow.colors[this.props.picshow.nowcolor];
		var type = this.props.picshow.types[this.props.picshow.nowtype];
	 	
		return (
		 	<div className="picnavwrap">
		 		<div className="images">
		 			<div className="unit" ref="unit">
		 				{picarr && picarr.map((item , index1)=>{
		 					return <ul key={index1}>
		 						{
		 							item.map((item , index2)=>{
			 							return <li 
				 							key={index2} 
				 							className={classnames({"cur" : index1 * 6 + index2 == this.props.picshow.nowidx})}
				 							onClick={()=>{this.props.dispatch({"type":"picshow/changepic" , "n" : index1 * 6 + index2})}}
				 						>
			 								<img src={`carpic/${carname}/${color}/${type}/${item}`} alt=""/>
			 							</li>
		 							})
		 						}
		 					</ul>
		 				})}
		 			</div>
		 		</div>
		 		<div className="pager" ref="pager">
		 			<ul>
		 				{pageAmount && this.showPagerLis(pageAmount)}
		 			</ul>
		 		</div>
		 	</div>
		)
	}
}

export default connect(
	({picshow}) => {
		return {
			picshow
		}
	}
)(PicNav)