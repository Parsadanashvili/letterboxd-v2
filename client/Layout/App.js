import Header from "../components/Layout/Header";
import Styles from "../styles/Layout.module.css"
import AuthContext, {AuthContextProvider} from "../Context/auth-context";
import Sidebar from "../components/Layout/Sidebar";
import {useContext} from "react";

const App = (props) => {
    const authCtx = useContext(AuthContext);

    return (
        <AuthContextProvider>
            <div className={Styles.main}>
                <Header/>
                <Sidebar/>
                <div className={Styles.contentBody}>
                    {props.children}
                </div>
            </div>
        </AuthContextProvider>
    )
}

export default App
