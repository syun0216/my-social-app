import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// views
import Router from './router/router'
// fonts
import * as Font from 'expo-font';

export default class App extends React.PureComponent {
  
  public componentDidMount() {
    Font.loadAsync({
      'SourceSansPro-Regular': require('./fonts/SourceSansPro-Regular.ttf'),
      'SourceSansPro-Bold': require('./fonts/SourceSansPro-Bold.ttf'),
      'SourceSansPro-Semibold': require('./fonts/SourceSansPro-SemiBold.ttf'),
      
    });
  }

  public render() {
    return (
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    );
  }
}
