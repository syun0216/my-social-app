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