import React from 'react';

import { Provider } from 'mobx-react';
// views
import Router from './router/router'
// fonts
import * as Font from 'expo-font';
import rootStore from './store/rootStore'

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
      <Provider {...rootStore}>
        <Router />
      </Provider>
    );
  }
}
