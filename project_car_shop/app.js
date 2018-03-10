var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
var formidable = require("formidable");
var _ = require("underscore");

//静态化www文件夹
app.use(express.static("www"));

app.get("/api/car/:carname" , (req,res)=>{
	//汽车的名字，就是文件夹的名字，英语
	var carname = req.params.carname;
	//完整的图片文件夹路径
	var dirpath = path.resolve(__dirname , "www/carpic/" , carname);
	//结果
	var results = {"name" : carname , "colors" : {}};
	//readdir表示读取指定文件夹中的所有文件夹名字
	fs.readdir(dirpath , (err , colornames) => {
		if(err){
			res.json({"wrong" : 1});
			return;
		}
		colornames.forEach((colorname)=>{
			var o = {};
			//再次遍历这个颜色文件夹，得到类型，同步遍历。
			//同步函数没有回调函数，都是等号左边得到值
			var typenames = fs.readdirSync(path.resolve(dirpath , colorname));
			typenames.forEach((typename)=>{
				//再次遍历这个颜色的这个类型的文件夹，得到图片名字
				//同步遍历。
				var images = fs.readdirSync(path.resolve(dirpath , colorname , typename) );
				//删除"Thumbs.db"这项
				images = images.filter((item)=>{
					return item != "Thumbs.db";
				});
				o[typename] = images;
			});
			results.colors[colorname] = {"types" : o};
		});
		res.json(results);
	});
});

//汽车查询接口
app.post("/cars" , (req ,res)=>{
	fs.readFile("./db/cardata.json" , (err,data)=>{
		var form = new formidable.IncomingForm();
		form.parse(req , (err , fileds) => {
			//完整的汽车清单
			var list = JSON.parse(data.toString()).list;

			//拿到前端传入的filters对象
			const filters = JSON.parse(fileds.filters);
			//拿到前端传入的paginations对象
			const {pageSize , total , current , field , order} = JSON.parse(fileds.paginations);


		 
			//遍历过滤器
			filters.forEach((filter)=>{
				switch(filter.name){
					case "country" :
					 	list = list.filter((car)=>{
					 		return filter.value.includes(car.country)
					 	});
						break;
					case "brand" :
						list = list.filter((car)=>{
					 		return filter.value.includes(car.brand)
					 	});
						break;
					case "seat" :
						list = list.filter((car)=>{
					 		return filter.value.includes(car.seat)
					 	});
						break;
					case "type" :
						list = list.filter((car)=>{
					 		return filter.value.includes(car.type)
					 	});
						break;
					case "price" : 
						list = list.filter((car)=>{
					 		return car.price < filter.value.b && car.price > filter.value.a
					 	});
						break;
					case "date" : 
						list = list.filter((car)=>{
							const cardata = new Date(car.date);
					 		return  cardata < new Date(filter.value.b) && cardata > new Date(filter.value.a)
					 	});
						break;
				}
			});

		  	
		  	//排序接口
	  		if(order == "ascend"){
	  			list = _.sortBy(list , field);
	  		}else{
	  			list = _.sortBy(list , field).reverse();
	  		}
		  	 
		 
			res.json({
				"total" : list.length ,
				"cars" : list.slice(pageSize * (current - 1) , pageSize * current)
			});
		});
		
	});
});

app.listen(3000);
console.log(3000);