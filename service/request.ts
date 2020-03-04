import AppStorage from '../cache/appStorage';
//config
import projectConfig from '../config';

const baseUrl: string = projectConfig.dev.API_PREFIX;
const timeoutSeconds: number = 20;

export default class BaseRequest {
  /// POST方法
  static async postData(url, params: Params = null): Promise<any> {
    let res: any = await AppStorage.getUser();
    if (res) {
      res = JSON.parse(res);
    }
    let p1 = new Promise((resolve, reject) => {
      let _options: any = {
        method: 'POST',
        ///请求头参数
        headers: {
          // 'Accept': 'application/json',
          // 'Content-Type': 'application/json',
          'X-BLACKCAT-TOKEN': res ? res.token : null,
        },
      };
      if (params) {
        _options = {
          ..._options,
          body: params ? JSON.stringify(params) : null,
        };
      }
      fetch(`${baseUrl}${url}`, _options)
        .then(response => {
          return response.text().then(function(text) {
            console.log('text', text);
            return text ? JSON.parse(text) : {};
          });
        })
        .then(responseJson => {
          /// 拿到数据可以在此同意处理服务器返回的信息
          resolve(responseJson);
        })
        .catch(error => {
          reject(error);
        });
    });

    let p2 = this.requestTimeout();
    /// 因为fetch网络请求没有超时时间设置，所以使用Promise实现请求超时
    return Promise.race([p1, p2]);
  }

  /// POST方法
  static async postJSONData(url: string, params: Params = null): Promise<any> {
    let res: any = await AppStorage.getUser();
    if (res) {
      res = JSON.parse(res);
    }
    let p1 = new Promise((resolve, reject) => {
      let _options: any = {
        method: 'POST',
        ///请求头参数
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-BLACKCAT-TOKEN': res ? res.token : null,
        },
      };
      if (params) {
        _options = {
          ..._options,
          body: params ? JSON.stringify(params) : null,
        };
      }
      fetch(`${baseUrl}${url}`, _options)
        .then(response => {
          return response.text().then(function(text) {
            console.log('text', text);
            return text ? JSON.parse(text) : {};
          });
        })
        .then(responseJson => {
          /// 拿到数据可以在此同意处理服务器返回的信息
          resolve(responseJson);
        })
        .catch(error => {
          reject(error);
        });
    });

    let p2 = this.requestTimeout();
    /// 因为fetch网络请求没有超时时间设置，所以使用Promise实现请求超时
    return Promise.race([p1, p2]);
  }

  /// Get方法
  static async getData(url: string): Promise<any> {
    // console.log(`${baseUrl}${url}`)
    let res: any = await AppStorage.getUser();
    if (res) {
      res = JSON.parse(res);
    }
    console.log('res1234', res);
    let p1 = new Promise((resolve, reject) => {
      fetch(`${baseUrl}${url}`, {
        method: 'GET',
        headers: {
          'X-BLACKCAT-TOKEN': res ? res.token : null,
        },
      })
        .then(response => {
          return response.json();
        })
        .then(responseJson => {
          /// 拿到数据可以在此同意处理服务器返回的信息
          resolve(responseJson);
        })
        .catch(error => {
          reject(error);
        });
    });
    let p2 = this.requestTimeout();
    return Promise.race([p1, p2]);
  }

  /// delete方法
  static async deleteData(url: string): Promise<any> {
    let res: any = await AppStorage.getUser();
    if (res) {
      res = JSON.parse(res);
    }
    let p1 = new Promise((resolve, reject) => {
      fetch(`${baseUrl}${url}`, {
        method: 'DELETE',
        headers: {
          'X-BLACKCAT-TOKEN': res ? res.token : null,
        },
      })
        .then(response => {
          return response.text().then(function(text) {
            console.log('text', text);
            return text ? JSON.parse(text) : {};
          });
        })
        .then(responseJson => {
          /// 拿到数据可以在此同意处理服务器返回的信息
          resolve(responseJson);
        })
        .catch(error => {
          reject(error);
        });
    });
    let p2 = this.requestTimeout();
    return Promise.race([p1, p2]);
  }

  /// 设置超时的方法
  static requestTimeout() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('链接超时');
      }, timeoutSeconds * 1000);
    });
  }
}
