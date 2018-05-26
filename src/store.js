import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import throttle from 'lodash/throttle';

import { loadState, saveState } from './utils/localStorage';
// import mainSaga from './dataflow/saga';
import reducer from './dataflow/reducer';

function configureStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddleware);
  const persistedState = loadState();

  const store = createStore(reducer, persistedState, composeEnhancers(middleware));

  // setting localStorage
  store.subscribe(throttle(() => {
    const { user } = store.getState();
    saveState({ user });
  }, 1000));

  // sagaMiddleware.run(mainSaga);

  return store;
}


export default configureStore;
