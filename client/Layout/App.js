import Header from "../components/Header";
import Styles from "../styles/Layout.module.css"
import {AuthContextProvider} from "../Context/auth-context";

const App = (props) => {
    return (
        <AuthContextProvider>
            <div className={Styles.main}>
                <Header/>
                <div className={Styles.contentBody}>
                    {props.children}
                </div>
            </div>
        </AuthContextProvider>
    )
}

export default App
