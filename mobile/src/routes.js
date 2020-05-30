import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Duda from './pages/Duda';

const AppStack = createStackNavigator();

export default function Routes() {
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false}}>
                <AppStack.Screen name="Home" component={Home}/>
                <AppStack.Screen name="Duda" component={Duda}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}