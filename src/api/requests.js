import axios from "axios";
const requests =axios.create({
  baseURL:'http://kumanxuan1.f3322.net:8001',
  timeout:5000
})
requests.interceptors.request.use(
  config=>{
    let token =sessionStorage.getItem('token')
    if(token){
      config.headers['X-Nideshop-Token']=token
    }
    return config
  }
)
requests.interceptors.response.use(
  res=>{
    return res.data
  },
  error=>{
    return Promise.reject(new Error('faile'))
  }
)
export default requests