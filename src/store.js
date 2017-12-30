import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';

import { loadState, saveState } from './utils/localStorage';
// import mainSaga from './dataflow/saga';
import reducer from './dataflow/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);
const persistedState = loadState();

const store = createStore(reducer, persistedState, composeEnhancers(middleware));

// setting localStorage
store.subscribe(() => {
  const { auth, user } = store.getState();
  saveState({ auth, user });
});

// sagaMiddleware.run(mainSaga);

export default store;
