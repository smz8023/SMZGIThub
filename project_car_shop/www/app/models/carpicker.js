export default {
	namespace : "carpicker" ,
	state : {
		filters : [],
		filternames : [] , 
		cars : [],
		paginations : {
			current : 1,
			total : 0,
			pageSize : 10,
			field : "id" , 		//按谁排序,
			order : "ascend"	//正序ascend 倒序descend
		},
		brandoptions : [""]
	},
	reducers : {
		init_sync(state , {brandoptions}){
			return {
				...state ,
				brandoptions
			}
		},
		addfilter_sync(state , {name , value , brandoptions = state.brandoptions}){
			return {
				...state , 
				filters : [
					...state.filters ,
					{name , value}
				],
				filternames : [
					...state.filternames ,
					name
				],
				brandoptions
			}
		},
		delfilter_sync(state , {name  , brandoptions = state.brandoptions}){
			return {
				...state , 
				filters : state.filters.filter((item)=>{
					return item.name != name
				}),
				filternames : state.filternames.filter((item)=>{
					return item != name
				}),
				brandoptions
			}
		},
		fetchCarData_sync(state , {cars , total}){
		 
			return {
				...state , 
				cars : cars ,
				paginations : {
					...state.paginations ,
					total
				}
			}
		},
		changepage_sync(state , {page , pageSize , field , order}){
			return {
				...state ,
				paginations : {
					...state.paginations ,
					current : page ,
					pageSize,
					field , 
					order
				}
			}
		}
	},
	effects : {
		init : function*(action , {put}){
			const data = yield fetch("/api/brands.json").then((data)=>{
				return data.json();
			});
			yield put({"type" : "init_sync" , "brandoptions" : Object.values(data).reduce((a,b)=>{
				return a.concat(b);
			})});

			//然后拉取数据
			yield put({"type" : "fetchCarData"});
		},
		addfilter : function*({name , value} , {put}){
			if(name == "country"){
				//如果更改的是国家，此时要拉取数据库得到品牌的列表
				const data = yield fetch("/api/brands.json").then((data)=>{
					return data.json();
				});
				 
				var brandoptions = [];

				//遍历传入的国家的数组，将这个国家对应的品牌合并到品牌选项数组中
				value.forEach((item)=>{
					brandoptions = brandoptions.concat(data[item]);
				});
			}

			//先发出同步的增加过滤器的命令
			yield put({"type" : "addfilter_sync" , name , value , brandoptions});	
			//然后拉取数据
			yield put({"type" : "fetchCarData"});
		},
		delfilter : function*({name}, {put}) {
			if(name == "country"){
				//如果更改的是国家，此时要拉取数据库得到品牌的列表
				const data = yield fetch("/api/brands.json").then((data)=>{
					return data.json();
				});
				 
				var brandoptions = Object.values(data).reduce((a,b)=>{
					return a.concat(b);
				})
			}

			//先发出同步的删除过滤器的命令
			yield put({"type" : "delfilter_sync" , name  , brandoptions});
			//然后拉取数据
			yield put({"type" : "fetchCarData"});	
		},
		//更改页码、更改排序
		changepage : function*({page , pageSize , field , order} , {put}){
			//先发出同步的更改过滤器的命令
			yield put({"type" : "changepage_sync" , page , pageSize , field , order});
			//然后拉取数据
			yield put({"type" : "fetchCarData"});	
		},
		//拉取数据
		fetchCarData : function *({},{put , select}){
			//这里如果要得到state，此时要用select函数即可。
			const filters = yield select((state)=>{return state.carpicker.filters});
			const paginations = yield select((state)=>{return state.carpicker.paginations});

			const {cars , total} = yield fetch("/cars" , {
				"method" : "POST",
				"headers": {
    				'Content-Type': 'application/json'
  				},
  				"body" : JSON.stringify({
  					"filters" : JSON.stringify(filters) ,
  					"paginations" : JSON.stringify(paginations)
  				})
			}).then((data)=>{
				return data.json();
			});

		 
			//寻找完车之后，要再次发出同步请求，更新state中的cars数据，更改总条目数
			yield put({"type" : "fetchCarData_sync" , cars , total});
		}
	}
}