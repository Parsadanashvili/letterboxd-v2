import '../styles/globals.css'
import App from "../Layout/App";
import {Provider} from "react-redux";
import store from "../store";
import {authActions} from "../store/Auth";
import cookie from "cookie-cutter";

function MyApp({Component, pageProps}) {
    const dispatch = store.dispatch;

    store.subscribe(()=>{
        const state = store.getState();
        cookie.set('user', JSON.stringify(state.auth.user));
        cookie.set('accessToken', state.auth.access_token)
        cookie.set('isLoggedIn', true)
    });

    const getAuthFromLocalStorage = () => {
        try {
            const user = JSON.parse(cookie.get('user'))
            const accessToken = cookie.get('accessToken')
            const isLoggedIn = cookie.get('isLoggedIn')
            if (isLoggedIn) {
                return {
                    user,
                    access_token: accessToken
                }
            }
        }
        catch (e){
            console.log(e)
        }
    }

    const Auth = getAuthFromLocalStorage()
    if(Auth){
        dispatch(authActions.hydrate(Auth))
    }

    return (
        <Provider store={store}>
            <App>
                <Component {...pageProps} />
            </App>
        </Provider>
    )
}

export default MyApp
