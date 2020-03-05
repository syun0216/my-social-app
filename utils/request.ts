import config from '../config';
// eslint-disable-next-line no-unused-vars
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import qs from 'qs';
//cache
import AppStorage from '../cache/appStorage';
//navigation
import * as RootNavigation from '../router/rootNavigation';

const service: AxiosInstance = axios.create({
  baseURL: config.dev.API_PREFIX,
  timeout: 8000,
});

service.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    let res: any = await AppStorage.getUser();
    // console.log('res :', config);
    if (res) {
      const _res: loginModel = JSON.parse(res);
      config.headers['X-BLACKCAT-TOKEN'] = _res.token;
    }
    if (config.method === 'post' && config.data) {
      config.data =
        config.headers.post['Content-Type'] === 'application/json'
          ? config.data
          : qs.stringify(config.data);
    }
    return config;
  },
  error => {
    console.log('error', error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use((response: AxiosResponse) => {
  //   console.log('response', response);
  return response;
});

export const request = async (config: AxiosRequestConfig = {}) => {
  try {
    const { data: res } = await service(config);
    return res;
  } catch (error) {
    console.log('error', error);
    AppStorage.removeUser();
    RootNavigation.replace('Login', {});
  }
};

export default request;
