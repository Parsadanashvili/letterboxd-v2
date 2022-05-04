import '../styles/globals.css'
import App from "../Layout/App";
import {Provider} from "react-redux";
import store from "../store";
import axios from "axios";
import {useContext} from "react";
import AuthContext from "../Context/auth-context";
import {Toaster} from "react-hot-toast";

function MyApp({Component, pageProps}) {
    const authCtx = useContext(AuthContext);

    axios.defaults.headers.common['Authorization'] = authCtx.token;
    axios.defaults.baseURL = 'http://localhost:3003';

    return (
        <Provider store={store}>
            <Toaster position="top-center"/>
            <App>
                <Component {...pageProps} />
            </App>
        </Provider>
    )
}

export default MyApp
