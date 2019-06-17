import 'cross-fetch/polyfill';
import React from 'react';
import {I18nextProvider} from 'react-i18next';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import RootApp from './src/App';
import configureStore from './src/configureStore';
import i18n from './src/i18n';

const {store, persistor} = configureStore();

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<I18nextProvider i18n={i18n}>
					<RootApp />
				</I18nextProvider>
			</PersistGate>
		</Provider>
	);
}
