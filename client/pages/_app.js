import '../styles/globals.css'
import App from "../Layout/App";
import {Axios} from "axios";

function MyApp({Component, pageProps}) {


    return (
        <App>
            <Component {...pageProps} />
        </App>
    )
}

export default MyApp
