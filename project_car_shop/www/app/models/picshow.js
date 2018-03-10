export default {
	namespace : "picshow" ,
	state : {
		"nowcolor" : 0 , 			//当前颜色
		"nowtype"  : 0 ,			//当前类型
		"nowidx"   : 0 , 			//当前的图片的序号
		"colors"   : [],			//颜色数组
		"types"    : [],			//图集名字的数组
		"data"     : {}
	} ,
	reducers : {
		//拉取默认数据
		init_sync(state , {data}){
			var colorsarr = Object.keys(data.colors);
			//这里控制types的顺序：
			var types = getNewTypes(data , 0);

			return {
				...state , 
				data ,
				colors : colorsarr ,
				types : types
			}
		},
		//改变图集
		changetype(state , {typename}){
			return {
				...state , 
				nowidx : 0,
				nowtype : state.types.indexOf(typename)
			}
		},
		//改变颜色
		changecolor(state , {n}){
			var colorsarr = Object.keys(state.data.colors);
			var types = getNewTypes(state.data , n);

			return {
				...state , 
				types : types,
				nowcolor : n ,
				nowtype : 0 ,
				nowidx : 0
			}
		},
		//点击图片变图 
		changepic(state , {n}){
			return {
				...state , 
				nowidx : n
			}
		},
		//下一张
		gonext(state){
			var types = state.data.colors[state.colors[state.nowcolor]].types;
			var imagesarr = types[state.types[state.nowtype]];
			var typesArr = Object.keys(types);
			//如果已经到了此图集的末了
			if(state.nowidx + 1 == imagesarr.length){
				//再次判断是不是到了本颜色的末了了
				if(state.nowtype + 1 == typesArr.length){
					var n = state.nowcolor + 1;
					//再次再次判断是不是到总颜色的末了了！
					if(n == Object.keys(state.data.colors).length){
						alert("真的没有了！");
						return state;
					}
					var types = getNewTypes(state.data , n);

					return {
						...state , 
						nowidx : 0,
						nowtype : 0,
						nowcolor : n,
						types : types
					}
				}
				return {
					...state ,
					nowidx : 0,
					nowtype : state.nowtype + 1
				};
			}
			return {
				...state ,
				nowidx : state.nowidx + 1
			}
		},
		//上一张
		goprev(state){
			

			//判断是不是到了图集的头头了
			if(state.nowidx == 0){
				//继续判断是不是到了本颜色的头了
				if(state.nowtype == 0){
					if(state.nowcolor == 0){
						alert("真的到头了！");
						return state;
					}
	 				
					let types = state.data.colors[state.colors[state.nowcolor - 1]].types;
					let typesArr = getNewTypes(state.data , state.nowcolor - 1);
					let imagesarr = types[typesArr[typesArr.length - 1]];

					return {
						...state , 
						nowtype : typesArr.length - 1,
						nowidx : imagesarr.length - 1,
						nowcolor : state.nowcolor - 1,
						types : typesArr
					}
				}

				let types = state.data.colors[state.colors[state.nowcolor]].types;
				let imagesarr = types[state.types[state.nowtype]];
				let typesArr = Object.keys(types);
				return {
					...state , 
					nowidx : types[state.types[state.nowtype - 1]].length - 1 , 
					nowtype : state.nowtype - 1
				} 
			}
			return {
				...state , 
				nowidx : state.nowidx - 1
			}
		}
	},
	effects : {
		init : function* ({cartype} , {put}){
			var data = yield fetch("/api/car/" + cartype).then((data)=>{
				return data.json();
			});
			yield put({"type" : "init_sync" , data});
		}
	}
}


function getNewTypes(data , n){
	var colorsarr = Object.keys(data.colors);
	//这里控制types的顺序：
	var types = [];
	if(Object.keys(data.colors[colorsarr[n]].types).includes("view")){
		types.push("view");
	}

	if(Object.keys(data.colors[colorsarr[n]].types).includes("center")){
		types.push("center");
	}

	if(Object.keys(data.colors[colorsarr[n]].types).includes("detail")){
		types.push("detail");
	}
	return types;
}