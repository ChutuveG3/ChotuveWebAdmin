import axios from "axios";
import {getSetting} from "../settings";
import Swal from 'sweetalert2'

const authApi = axios.create({
    baseURL: getSetting('AUTH_BASE_URL'),
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

export {authApi};