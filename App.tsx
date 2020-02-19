import React from 'react';
import { Provider } from 'mobx-react';
// views
import Router from './router/router'
// fonts
import * as Font from 'expo-font';
import rootStore from './store/rootStore'

export default class App extends React.PureComponent {

  public state = {
    fontLoaded: false
  }
  
  public async componentDidMount() {
    await Font.loadAsync({
      'SourceSansPro-Regular': require('./fonts/SourceSansPro-Regular.ttf'),
      'SourceSansPro-Bold': require('./fonts/SourceSansPro-Bold.ttf'),
      'SourceSansPro-Semibold': require('./fonts/SourceSansPro-SemiBold.ttf'),
    });
    this.setState({
      fontLoaded: true
    })
  }

  public render() {
    return (
      <Provider {...rootStore}>
        { this.state.fontLoaded ? <Router /> : null }
      </Provider>
    );
  }
}
