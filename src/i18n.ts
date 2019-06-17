import i18next from 'i18next';
import React from 'react';
import {Namespace, useTranslation} from 'react-i18next';
import {Platform} from 'react-native';

const LanguageDetector = Platform.select({
	android: () => require('./lib/expoLanguagaDetector'),
	ios: () => require('./lib/expoLanguagaDetector'),
	web: () => require('i18next-browser-languagedetector'),
})();

/**
 * Temporary fix to copy static data with withTranslation function
 * Bug: https://github.com/i18next/react-i18next/issues/736
 */
export const withTranslation = (ns?: Namespace) => {
	return function Extend(WrappedComponent) {
		function I18nextWithTranslation(props) {
			const [t, i18n, ready] = useTranslation(ns, props);

			return React.createElement(WrappedComponent, {
				...props,
				i18n,
				t,
				tReady: ready,
			});
		}
		I18nextWithTranslation.navigationOptions = WrappedComponent.navigationOptions;
		return I18nextWithTranslation;
	};
};

i18next.use(LanguageDetector).init({
	defaultNS: 'translation',
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false, // not needed for react!!
		formatSeparator: ',',
	},
	keySeparator: false, // we use content as keys
	ns: ['translation'],
	react: {
		wait: true,
	},
	resources: {
		en: {
			todo: {
				completed: 'Completed',
				id: 'Todo ID',
				title: 'Title',
				user_id: 'User ID',
			},
			translation: {
				broken: 'Broken',
				eng: 'English',
				example: 'Example',
				fatal_error: 'Fatal error',
				fin: 'Finnish',
				hello: 'Hello',
				home: 'Home',
				login: 'Login',
				logout: 'Logout',
				no: 'No',
				secret: 'Secret',
				sve: 'Swedish',
				world: 'world',
				yes: 'Yes',
			},
		},
		fi: {
			todo: {
				completed: 'Valmis',
				id: 'Lista ID',
				title: 'Otsikko',
				user_id: 'Käyttäjä ID',
			},
			translation: {
				broken: 'Rikki',
				eng: 'Englanti',
				example: 'Esimerkki',
				fatal_error: 'Vakava virhe',
				fin: 'Suomi',
				hello: 'Hei',
				home: 'Koti',
				login: 'Kirjaudu sisään',
				logout: 'Kirjaudu ulos',
				no: 'Ei',
				secret: 'Salainen',
				sve: 'Ruotsi',
				world: 'maailma',
				yes: 'Kyllä',
			},
		},
		sv: {
			todo: {
				completed: 'Avslutad',
				id: 'Lista ID',
				title: 'Titel',
				user_id: 'Användar ID',
			},
			translation: {
				broken: 'Bruten',
				eng: 'Engelska',
				example: 'Exempel',
				fatal_error: 'Allvarligt fel',
				fin: 'Finska',
				hello: 'Hej',
				home: 'Hem',
				login: 'Anmelden',
				logout: 'Abmelden',
				no: 'Nej',
				secret: 'Memlighet',
				sve: 'Svenska',
				world: 'världen',
				yes: 'Ja',
			},
		},
	},
});
export default i18next;
