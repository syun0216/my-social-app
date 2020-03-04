import { Platform } from 'react-native';

type configType = {
  [key: string]: {
    API_PREFIX: string;
  };
};

const projectConfig: configType = {
  dev: {
    API_PREFIX:
      Platform.OS === 'ios'
        ? 'http://localhost:3333/api/v1'
        : Platform.OS === 'android'
        ? 'http://10.0.2.2:3333/api/v1'
        : '',
  },
  prod: {
    API_PREFIX: 'http://10.0.2.2:3333/api/v1',
  },
};

export default projectConfig;
