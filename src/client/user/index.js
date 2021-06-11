import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

@connect(state => state)
class User extends React.Component {
  render() {
    const {user, dispatch} = this.props;
    return (
      <div>
        <div>用户页面。</div>
        <div>model传过来的数据：{user.count}</div>
        <Button type="primary" onClick={() => dispatch({type: 'user/add'})}>增加</Button>
        <Button type="primary" onClick={() => dispatch({type: 'user/reduce'})}>减少</Button>
      </div>
    )
  }
}
export default User;