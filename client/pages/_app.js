import '../styles/globals.css'
import App from "../Layout/App";
import {Provider} from "react-redux";
import store from "../store";
import {AuthContextProvider} from "../Context/auth-context";
import {Toaster} from "react-hot-toast";

function MyApp({Component, pageProps}) {
    return (
        <Provider store={store}>
            <AuthContextProvider>
                <Toaster position="top-center"/>
                <App>
                    <Component {...pageProps} />
                </App>
            </AuthContextProvider>
        </Provider>
    )
}

export default MyApp
