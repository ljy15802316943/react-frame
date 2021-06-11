import React, {Component} from 'react';
import { connect } from 'dva';

@connect(state => state)
class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(111)
    // this.props.dispatch({type: 'home/getInfo', payload: {}});
  }

  render() {
    return (
      <div>
        <div>这是首页。</div>
      </div>
    )
  }
}
export default Home;