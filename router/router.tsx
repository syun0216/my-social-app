import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
//views
import LoginView from '../views/loginView'
import SearchView from '../views/searchView'
import MeView from '../views/meView'

const Stack = createStackNavigator();

const Router = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Me" component={MeView} />
    <Stack.Screen name="Search" component={SearchView} />
    <Stack.Screen name="Login" component={LoginView} />
  </Stack.Navigator>
)

export default Router