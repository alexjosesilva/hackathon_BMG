import React from 'react';
import {createAppContainer } from 'react-navigation';
import {createDrawerNavigator } from 'react-navigation-drawer';

import Home from './src/pages/Home';


import CustomDrawer from './src/components/CustomDrawer';

const Routes = createAppContainer(
	
	createDrawerNavigator({
		Home
	}, {
		initialRouteName: 'Home',
	
	})
)

export default Routes;