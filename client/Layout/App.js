import Header from "../components/Layout/Header";
import Styles from "../styles/Layout.module.css"
import {AuthContextProvider} from "../Context/auth-context";
import {useSelector} from "react-redux";
import Sidebar from "../components/Layout/Sidebar";

const App = (props) => {
    const uiSidebarIsOpen = useSelector(state => state.ui.sidebarIsOpen);

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
