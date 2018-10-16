import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
// combineReducers方法，用于 Reducer 的拆分。你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。
// applyMiddleware 函数的作用就是对 store.dispatch 方法进行增强和改造，使得在发出 Action 和执行 Reducer 之间添加其他功能
// redux-thunk中间件可以让action创建函数先不返回一个action对象，而是返回一个函数，函数传递两个参数(dispatch,getState),在函数体内进行业务逻辑的封装
const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

export default store;