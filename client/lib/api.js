import axios from "axios";
import Cookies from 'cookie-cutter';

export default function API() {
    return axios.create({
        baseURL: 'http://localhost:3003',
        headers: {
            "Authorization": "Bearer " + Cookies.get('accessToken')
        }
    });
};