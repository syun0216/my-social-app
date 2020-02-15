import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
//views
import LoginView from '../views/loginView'
import SearchView from '../views/searchView'
import DetailView from '../views/detailsView'
import MeView from '../views/meView'
import InitView from '../views/initView'

const Stack = createStackNavigator();

const Router = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Init" component={InitView} />
    <Stack.Screen name="Login" component={LoginView} />
    <Stack.Screen name="Search" component={SearchView} />
    <Stack.Screen name="Me" component={MeView} />
    <Stack.Screen name="Detail" component={DetailView} />
  </Stack.Navigator>
)

export default Router