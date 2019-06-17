import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import DemoView from './views/DemoView';
import HomeView from './views/HomeView';

const MainNavigator = createStackNavigator({ // tslint:disable:object-literal-sort-keys
	Home: {screen: HomeView, default: true},
	Demo: {screen: DemoView},
});

const App = createAppContainer(MainNavigator);

export default App;
