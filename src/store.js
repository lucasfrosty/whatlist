import { createStore } from 'redux';
import throttle from 'lodash/throttle';

import { loadState, saveState } from './utils/localStorage';
import reducer from './dataflow/reducer';

function configureStore() {
  const persistedState = loadState();
  const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

  const store = createStore(reducer, persistedState, reduxDevTools);

  // setting localStorage
  store.subscribe(throttle(() => {
    const { user } = store.getState();
    saveState({ user });
  }, 1000));

  return store;
}


export default configureStore;
