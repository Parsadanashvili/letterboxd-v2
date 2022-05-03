import '../styles/globals.css'
import App from "../Layout/App";
import {Provider} from "react-redux";
import store from "../store";
import axios from "axios";

function MyApp({Component, pageProps}) {
    axios.defaults.baseURL = 'http://localhost:3003';

    return (
        <Provider store={store}>
            <App>
                <Component {...pageProps} />
            </App>
        </Provider>
    )
}

export default MyApp
