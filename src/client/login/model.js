const model = {
  // 命名空间，页面使用的时候引入。
  namespace: 'login',
  state: {
    title: '登录页面。',
    count: 1,
    isLoad: false,
  },
  // 同步方法。
  reducers: {
    set(state, {payload}) {
      return {...state, ...payload};
    },
    reset(state) {
      return {...state, ...model.state};
    },
    setCondition(state, {payload}) {
      const params = Mapping.toParams(payload, state._condition, model.state.condition);
      return {...state, condition: {...state.condition, ...params}};
    },

    resetCondition(state) {
      return {...state, condition: {...model.state.condition}};
    },

    add(state) {
      return {...state, count: state.count + 1};
    },

    reduce(state) {
      return {...state, count: state.count - 1};
    }

  },
  // 异步方法。
  effects: {
    /* 用户状态改变 */
    * updateUserPhone({payload}, {call,put}) {
      yield put({type: 'set', payload: {isLoad: true}});
      console.log(111)
      yield put({type: 'set', payload: {isLoad: false}});
    },

  },
  
};

export default model;