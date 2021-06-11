import Ajax from 'utils/ajax';

const model = {
  // 命名空间，页面使用的时候引入。
  namespace: 'home',
  state: {
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
  },
  // 异步方法。
  effects: {
    * getInfo({payload}, {call,put}) {
      yield put({type: 'set', payload: {isLoad: true}});

      const res = yield call(() => (Ajax.get('/api/getData', {
        ...payload,
      })));
      console.log(res, 'res');

      yield put({type: 'set', payload: {isLoad: false}});
    },

  },
  
};

export default model;