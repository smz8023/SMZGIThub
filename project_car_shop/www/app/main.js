import React from 'react';
import dva from 'dva';
import picshow from "./models/picshow.js";
import carpicker from "./models/carpicker.js";
import route from "./route.js";
import { createLogger } from "redux-logger";

import 'antd/dist/antd.css';

//创建app
const app = dva({
	  // onAction: createLogger()
});

//使用model
app.model(picshow);
app.model(carpicker);

//使用路由
app.router(route);

//上树
app.start('#root');