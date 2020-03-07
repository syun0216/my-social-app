import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
//views
import LoginView from '../views/loginView';
import RegisterView from '../views/registerView';
import SearchView from '../views/searchView';
import DetailView from '../views/detailsView';
import MeView from '../views/meView';
import InitView from '../views/initView';
//navigation conf
import { navigationRef } from './rootNavigation';

const Stack = createStackNavigator();

const Router = (): React.ReactElement => (
  <NavigationContainer ref={navigationRef}>
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Init" component={InitView} />
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="Register" component={RegisterView} />
      <Stack.Screen name="Search" component={SearchView} />
      <Stack.Screen name="Me" component={MeView} />
      <Stack.Screen name="Detail" component={DetailView} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Router;
