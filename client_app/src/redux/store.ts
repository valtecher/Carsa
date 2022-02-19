import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from "./reducers/rootReducer";
import thunk from 'redux-thunk';

export function configureStore() {
    let store = createStore(rootReducer, composeWithDevTools(
        applyMiddleware(thunk)
    ))

    return store;
}

export type storeState = ReturnType<typeof store.getState>

export const getState = () => {
    return store.getState()
}

export const store = configureStore()

export type RootState = ReturnType<typeof store.getState>