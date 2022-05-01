import {Fragment} from "react";
import Header from "../components/Header";

const App = (props) => {
    return (
        <Fragment>
            <Header/>
            <main>
                {props.children}
            </main>
        </Fragment>
    )
}

export default App
