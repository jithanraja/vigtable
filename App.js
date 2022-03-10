/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { LogBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import Main from './app/main';
import { firebase } from '@react-native-firebase/firestore';
import appConfig from './app/config/appConfig';

class App extends Component {
  state = { loading: true };

  async componentDidMount() {

    if (appConfig.firebaseConfig) {
      var firebaseConfig = appConfig.firebaseConfig;

      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      } else {
        firebase.app(); // if already initialized, use that one
      }
    }

    LogBox.ignoreAllLogs();

    setTimeout(() => {
      this.setState(
        {
          loading: false,
        },
        () => {
          SplashScreen.hide();
        },
      );
    }, 3000);
  }

  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1 }}
          forceInset={{ top: 'never', bottom: 'never' }}>
          <Main />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

export default App;
