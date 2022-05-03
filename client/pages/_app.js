import '../styles/globals.css'
import App from "../Layout/App";
import {Provider} from "react-redux";
import store from "../store";

function MyApp({Component, pageProps}) {
    return (
        <Provider store={store}>
            <App>
                <Component {...pageProps} />
            </App>
        </Provider>
    )
}

export default MyApp
