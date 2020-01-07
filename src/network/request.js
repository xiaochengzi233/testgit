import axios from 'axios'
import router from 'router/index'
// export function request(config, params) {
//   // 创建连接实例
//   const instance_get = axios.create({
//     baseURL: 'http://192.168.1.100:8000/',
//     timeout: 2000,
//     // method: 'get',
//     // params:''
//   })
//   return instance_get(config);

  // axios拦截器
  // instance.interceptors.request;
  // instance.interceptors.response;
// }
axios.defaults.withCredentials = true;

export function request(config){
  // let _this = this;
  const instance_post = axios.create({
    // baseURL: 'http://192.168.1.100:8000/',
    baseURL: 'http://117.78.37.249:8001/',
  })

  //可以添加请求中的图标
  // instance.interceptors.request.use(config => {
  //
  // }, err => {
  //
  // });
  instance_post.interceptors.response.use(function(res){
    if(res.data.message != 'Normal') {
      console.log('登录状态判断');
      console.log(res);
      router.replace('/login');
    }
    return res;
  }, err => {
    return err;
  });
  return instance_post(config);
}
