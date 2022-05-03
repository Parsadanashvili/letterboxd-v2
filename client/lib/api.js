import axios from "axios";
import Cookies from 'cookie-cutter';

export default function API() {
    let instance = axios.create({
        baseURL: 'http://localhost:3003/',
    });

    let token = Cookies.get('accessToken');

    if(token){
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    }

    return instance;
};