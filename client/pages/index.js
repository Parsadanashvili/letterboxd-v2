import Button from "../components/UI/Button";
import {Fragment, useContext} from "react";
import Link from "next/link";
import Head from "next/head";
import AuthContext from "../Context/auth-context";
import GetStarted from "../components/GetStarted";

export default function Home() {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    if(isLoggedIn) {
        return (
            <Fragment>
                <Head>
                    <title>Letterboxd V2</title>
                </Head>
            </Fragment>
        );
    } else {
        return <GetStarted/>
    }
}