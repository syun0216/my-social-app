import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
//views
import LoginView from '../views/loginView'

const Stack = createStackNavigator();

const Router = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Login" component={LoginView} />
  </Stack.Navigator>
)

export default Router