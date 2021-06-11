import React from 'react';
import { connect } from 'dva';

@connect(state => state)
class Login extends React.Component {
  render() {
    const {login, user} = this.props;
    console.log(this.props, 'Login')
    return (
      <div>
        <div>登录页面。</div>
        <div>model传过来的数据：{login.title}</div>
        <div>user传过来的数据：{user.count}</div>
      </div>
    )
  }
}

export default Login;