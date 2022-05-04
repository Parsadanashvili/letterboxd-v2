import Header from "../components/Layout/Header";
import Styles from "../styles/Layout.module.css"
import AuthContext from "../Context/auth-context";
import Sidebar from "../components/Layout/Sidebar";
import {useContext} from "react";
import axios from "axios";

const App = (props) => {
    const authCtx = useContext(AuthContext);

    axios.defaults.headers.common['Authorization'] = "Bearer " + authCtx.token;
    axios.defaults.baseURL = 'http://localhost:3003';

    return (
        <div className={Styles.main}>
            <Header/>
            <Sidebar/>
            <div className={Styles.contentBody}>
                {props.children}
            </div>
        </div>
    )
}

export default App
