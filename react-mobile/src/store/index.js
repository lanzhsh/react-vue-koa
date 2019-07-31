import { createStore,combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {API} from '@/api';
import global from './reducer';
const rootReducer = combineReducers({
  global
})
export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk.withExtraArgument({API})),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
    return store;
};