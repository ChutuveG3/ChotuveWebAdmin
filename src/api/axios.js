import axios from "axios";
import {getSetting} from "../settings";


const authApi = axios.create({
    baseURL: getSetting('AUTH_BASE_URL') ,
    headers: {'Content-Type': 'application/json'}
});

authApi.interceptors.response.use(res => {
    return res;
}, err => {
    return new Promise((resolve) => {
        const originalReq = err.config;
        if (err.response.status === 401 && err.config)
        {
            originalReq._retry = true;
            const url = getSetting('AUTH_BASE_URL') + '/admins/sessions'
            const email = localStorage.getItem('email')
            const pass = localStorage.getItem('password')

            let res = axios.post(url,{email: email, password: pass})
                .then(res => {
                    localStorage.setItem('token', res.data.token)
                    return axios(originalReq);
            }).catch(err => console.log(err));
            resolve(res);
        }
        return Promise.reject(err);
    });
});

export {authApi};