import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers' 
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from './rootEpic';
import { persistStore } from 'redux-persist'




export  function configureStore() {
  const epicMiddleware = createEpicMiddleware(); 
    let store = createStore(rootReducer,  composeWithDevTools(
    applyMiddleware(epicMiddleware)
    // other store enhancers if any
  ))

  epicMiddleware.run(rootEpic);
  return store;
};

export type storeState = ReturnType<typeof store.getState>
export const getStore =  () => {
  return store.getState();
}

export const store =  configureStore();

export const persistor = persistStore(store);

