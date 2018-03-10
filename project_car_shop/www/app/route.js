import { Router, Route } from 'dva/router';
import App from "./containers/App.js";
import React from 'react';
import CarPicker from "./containers/CarPicker.js";
import PicShow from "./containers/PicShow.js";

export default ({ history }) => {
  return (
    <Router history={history}>
		<Route path="/" component={CarPicker} />
		<Route path="/picshow/:type" component={PicShow} />
    </Router>
  );
}