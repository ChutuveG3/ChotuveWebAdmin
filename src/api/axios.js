import axios from "axios";
import {getSetting} from "../settings";
import Swal from 'sweetalert2'

export const authApi = axios.create({
    baseURL: getSetting('AUTH_BASE_URL'),
    headers: {'Content-Type': 'application/json'}
});

export const mediaApi = axios.create({
    baseURL: getSetting('MEDIA_BASE_URL'),
    headers: {'Content-Type': 'application/json'}
});

export const appApi = axios.create({
    baseURL: getSetting('APP_BASE_URL'),
    headers: {'Content-Type': 'application/json'}
});


authApi.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        Swal.fire({
            title: "Session Expired",
            text: "Your session has expired.",
            type: "warning",
            closeOnConfirm: false
        }).then( function() {
            window.location = "/sign-in";
            return Promise.reject(error);
        });
    } else {
        return Promise.reject(error);
    }
});
