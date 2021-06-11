import React from 'react';
import dva from 'dva';
import { BrowserRouter } from 'dva/router';
import { createBrowserHistory } from 'history';
import models from 'models/index';


import App from 'client/App';

// 1. 初始化配置。
const app = dva({
  history: createBrowserHistory(),
});


// 2. Plugins
// app.use({});


// 3. Model
// 此处一定要开启注册，以便dva将当前model注入到redux空间中
models.forEach((model) => {
  // if (model.namespace === 'global') {
  //   model.state.user = user || {};
  // }
  app.model(model).default;
});


// 4. 路由。
app.router(() => 
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


// 5. 启动dva应用。
app.start('#root');


// webpack配置,react局部更新。
if (module && module.hot) {
  module.hot.accept()
}
