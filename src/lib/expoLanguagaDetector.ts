import Expo, {Localization} from 'expo';

const languageDetector = { // tslint:disable:no-empty
	async: true,
	cacheUserLanguage: () => {},
	detect: (callback) => {
		callback(Localization.locale.split('-')[0]);
	},
	init: () => {},
	type: 'languageDetector',
};

export default languageDetector;
