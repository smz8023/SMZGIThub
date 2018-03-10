import React from "react";
import { connect } from "dva";
import classnames from "classnames";

import "./Filter.less";

class Filter extends React.Component{
	constructor({picshow}){
		super();
	}

 
	 
	render(){
		if(this.props.picshow.data.colors){
			var types = this.props.picshow.data.colors[this.props.picshow.colors[this.props.picshow.nowcolor]].types; 
		}
	 
		return (
			<div className="filter_wrap">
				<h3 id="filterh3">{this.props.picshow.data.name}</h3>
				<div className="typesfilter">
					<ul>
						{
							this.props.picshow.types.includes("view") 
							&&   
							<li 
								className={classnames({"cur" : this.props.picshow.types[this.props.picshow.nowtype] == "view"})}
								onClick={()=>{this.props.dispatch({"type":"picshow/changetype" , "typename" : "view"})}}
							>
								外观({types.view.length})
							</li> 
						}
						
						{
							this.props.picshow.types.includes("center") 
							&& 
							<li 
								className={classnames({"cur" : this.props.picshow.types[this.props.picshow.nowtype] == "center"})}
								onClick={()=>{this.props.dispatch({"type":"picshow/changetype" , "typename" : "center"})}}
							>
								中控({types.center.length})
							</li> 
						}
						
						{
							this.props.picshow.types.includes("detail") 
							&& 
							<li 
								className={classnames({"cur" : this.props.picshow.types[this.props.picshow.nowtype] == "detail"})}
								onClick={()=>{this.props.dispatch({"type":"picshow/changetype" , "typename" : "detail"})}}
							>
								细节({types.detail.length})
								
							</li> 
						}
					</ul>
				</div>

				<div className="cl"></div>

				<div className="colorsfilter" ref="colorsfilter">
					<h4>颜色:</h4>
					<ul>
						{this.props.picshow.colors.map((item , index)=>{
							return <li 
								key={index} 
								style={{"backgroundColor":item}}
								className={classnames({"cur" : index == this.props.picshow.nowcolor})}
								onClick={()=>{this.props.dispatch({"type":"picshow/changecolor" , "n" : index})}}
							></li>
						})}
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
)(Filter)