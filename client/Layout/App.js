import Header from "../components/Header";
import Styles from "../styles/Layout.module.css"

const App = (props) => {
    return (
        <div className={Styles.main}>
            <Header/>
            <div className={Styles.contentBody}>
                {props.children}
            </div>
        </div>
    )
}

export default App
