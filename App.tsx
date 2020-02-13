import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// views
import Router from './router/router'
// fonts
import * as Font from 'expo-font';

export default class App extends React.PureComponent {
  
  private componentDidMount() {
    Font.loadAsync({
      'SourceSansPro-Bold': require('./fonts/SourceSansPro-Bold.ttf'),
      'SourceSansPro-Semibold': require('./fonts/SourceSansPro-SemiBold.ttf'),
      'SourceSansPro-Regular': require('./fonts/SourceSansPro-Regular.ttf')
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
