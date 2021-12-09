import {useMemo} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

let store;

const initialState = {
  user_data:{name:' name name',},
  user_fname:'',
  user_lname:'',
  user_phone:'',
  user_image:'',
  user_id:'',

  category_filter:'',
  search_location:'',
  pagenate_count:1,
  sellers_list:[], 


  service_filter:'',
  service_filter_location_name:'',
  service_filter_item:'',

  
  user_workinghours:[
    { starting_time: 0, end_time: 0, off: 0, day: "1" },
    { starting_time: 0, end_time: 0, off: 0, day: "2" },
    { starting_time: 0, end_time: 0, off: 0, day: "3" },
    { starting_time: 0, end_time: 0, off: 0, day: "4" },
    { starting_time: 0, end_time: 0, off: 0, day: "5" },
    { starting_time: 0, end_time: 0, off: 0, day: "6" },
    { starting_time: 0, end_time: 0, off: 0, day: "7" }
  ],
  lastUpdate: 0,
  light: false,
  count: 222222,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TICK':
      return {
        ...state,
        lastUpdate: action.lastUpdate,
        light: !!action.light,
      };
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    case 'RESET':
      return {
        ...state,
        count: initialState.count,
      };
    case 'user_data':
      return {
        ...state,
        user_data: action.payload,
      };
    case 'user_fname':
      return {
        ...state,
        user_fname: action.payload,
      };
    case 'user_lname':
      return {
        ...state,
        user_lname: action.payload,
      };
    case 'user_phone':
      return {
        ...state,
        user_phone: action.payload,
      };
    case 'user_image':
      return {
        ...state,
        user_image: action.payload,
      };
    case 'user_workinghours':
      return {
        ...state,
        user_workinghours: action.payload,
      };
    case 'sellers_list':
      return {
        ...state,
        sellers_list: action.payload,
      };
    case 'pagenate_count':
      return {
        ...state,
        pagenate_count: action.payload,
      };
    case 'category_filter':
      return {
        ...state,
        category_filter: action.payload,
      };
    case 'service_filter':
      return {
        ...state,
        service_filter: action.payload,
      };
    case 'search_location':
      return {
        ...state,
        search_location: action.payload,
      };
    case 'service_filter_location_name':
      return {
        ...state,
        service_filter_location_name: action.payload,
      };
    case 'service_filter_item':
      return {
        ...state,
        service_filter_item: action.payload,
      };
    default:
      return state;
  }
};

function initStore(preloadedState = initialState) {
  return createStore(
      reducer,
      preloadedState,
      composeWithDevTools(applyMiddleware()),
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}