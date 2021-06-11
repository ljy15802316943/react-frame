import Home from '../client/home/index';
import Login from '../client/login/index';
import User from '../client/user/index';
import NotFound from '../client/notFound/index';

const routes = [
  {
    path: '/',
    exact: true,
    requiresAuth: false,
    component: Home,
  },
  {
    path: '/login',
    requiresAuth: true, //需要登陆后才能跳转的页面
    component: Login,
  },
  {
    path: '/user',
    requiresAuth: false,
    component: User,
  },
  {
    path: '*',
    component: NotFound,
  },
];

export default routes;
