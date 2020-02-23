import {AsyncStorage} from 'react-native'
import { isJsonString } from '../utils/commonUtils'

const USER_KEY = 'storage_key_user_data'

const setData = (key: string, data: any): Promise<void> => {
  if(Object.prototype.toString.call(data) == "[object String]") {
    return AsyncStorage.setItem(key, data);
  } else {
    return AsyncStorage.setItem(key, JSON.stringify(data));
  }
}

export default class AppStorage {
  static getUser = (): Promise<any> => {
    return AsyncStorage.getItem(USER_KEY)
  }
  static setUser = (data): Promise<void> => {
    return setData(USER_KEY, data)
  }
  static removeUser = (): void => {
    AsyncStorage.removeItem(USER_KEY)
  }
  static removeAll = (): void => {
    AsyncStorage.clear()
  }
}

function storageFactory(key: string) {
  this.key = key;
  this.setData = function(data) {
    if(Object.prototype.toString.call(data) == "[object String]") {
      AsyncStorage.setItem(this.key, data);
    } else {
      AsyncStorage.setItem(this.key, JSON.stringify(data));
    }
  };
  this.getData = function(callBack) {
    "use strict";
    if (callBack == null) {
      return;
    }
    AsyncStorage.getItem(this.key, (error, value) => {
      if (error != null || value == null || value.length == 0) {
        callBack(error, null);
        return;
      }
      if(isJsonString(value)) {
        callBack(null,JSON.parse(value))
      }else {
        callBack(null,value);
      }
    });
  };
  this.removeData = function() {
    AsyncStorage.removeItem(this.key);
  };
  this.removeAll = function() {
    AsyncStorage.clear();
  }
}

export const userStorage = new storageFactory('storage_key_user_data');