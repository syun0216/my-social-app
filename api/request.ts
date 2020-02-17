const baseUrl = 'http://localhost:3000/api/v1';
const token = '3c6c1a6d489dba3676b4e1385d48c4d2'
const timeoutSeconds = 20;
export default class BaseRequest{
    /// POST方法
    static postData(url,params=null){
        let p1 = new Promise((resolve,reject)=>{
            fetch(`${baseUrl}${url}`,{
                method:'POST',
                ///请求头参数
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-BLACKCAT-TOKEN': token
                },
                /// 请求参数
                body: params ? JSON.stringify(params) : null
            })
            .then((response)=>{
                return response.text().then(function(text) {
                    return text ? JSON.parse(text) : {}
                  })
                })
            .then((responseJson)=>{
                /// 拿到数据可以在此同意处理服务器返回的信息
                resolve(responseJson);
            })
            .catch((error)=>{
                reject(error);
            })
        })

        let p2 = this.requestTimeout();
        /// 因为fetch网络请求没有超时时间设置，所以使用Promise实现请求超时
        return Promise.race([p1,p2])
    }

    /// Get方法
    static getData(url){
        console.log(`${baseUrl}${url}`)
        let p1= new Promise((resolve,reject)=>{
            fetch(`${baseUrl}${url}`,{
                method: 'GET',
                headers: {
                    'X-BLACKCAT-TOKEN': token
                }
            })
            .then((response)=>{
                return response.json()
            })
            .then((responseJson)=>{
                /// 拿到数据可以在此同意处理服务器返回的信息
                resolve(responseJson);
            })
            .catch((error)=>{
                reject(error);
            })
        })
        let p2 = this.requestTimeout();
        return Promise.race([p1,p2]);
    }

    /// delete方法
    static deleteData(url){
        let p1= new Promise((resolve,reject)=>{
            fetch(`${baseUrl}${url}`, {
                method: 'DELETE',
                headers: {
                    'X-BLACKCAT-TOKEN': token
                }
            })
            .then((response)=>{
                return response.text().then(function(text) {
                    return text ? JSON.parse(text) : {}
                  })
            })
            .then((responseJson)=>{
                /// 拿到数据可以在此同意处理服务器返回的信息
                resolve(responseJson);
            })
            .catch((error)=>{
                reject(error);
            })
        })
        let p2 = this.requestTimeout();
        return Promise.race([p1,p2]);
    }

    /// 设置超时的方法
    static requestTimeout(){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                reject('链接超时');
            },timeoutSeconds * 1000)
        })
    }
}