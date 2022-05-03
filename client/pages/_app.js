import '../styles/globals.css'
import App from "../Layout/App";

function MyApp({Component, pageProps}) {
    return (
        <App>
            <Component {...pageProps} />
        </App>
    )
}

export default MyApp
