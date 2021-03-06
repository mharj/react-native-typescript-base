import {applyMiddleware, compose, createStore, StoreEnhancer} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import {initialState, rootReducer} from './reducers';

const persistConfig = {
	key: 'root',
	storage,
};

const enhancers: StoreEnhancer[] = [];

const persistedReducer = persistReducer(persistConfig, rootReducer);
if (process.env.NODE_ENV === 'development' && window && '__REDUX_DEVTOOLS_EXTENSION__' in window) {
	const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
	if (typeof devToolsExtension === 'function') {
		enhancers.push(devToolsExtension());
	}
}
const composedEnhancers = compose(
	applyMiddleware(thunk),
	...enhancers,
);
/**
 * @module createStore/default
 */
export default () => {
	const store = createStore(
		persistedReducer,
		initialState,
		composedEnhancers,
	);
	const persistor = persistStore(store);
	return {store, persistor};
};