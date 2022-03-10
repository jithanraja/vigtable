import React from 'react';
import { Provider } from 'react-redux';
import store from './stores/store';
import appConfig from './config/appConfig';
import constants from './config/constants';
import images from './config/images';
import FlashMessage from 'react-native-flash-message';

global.app = {
  appConfig: appConfig,
  constants: constants,
  images: images,
  loginUser: null,
  getStart: null,
  communityStart:null,
  currentLocation: { latitude: 37.78825, longitude: -122.4324 },
};

import Routes from './routes';

class Main extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <Provider store={store}>

        <Routes />
        <FlashMessage position="top" style={{ paddingRight: 30 }} />
      </Provider>
    );
  }
}

export default Main;