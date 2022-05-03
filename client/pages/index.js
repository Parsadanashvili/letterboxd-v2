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
                <section className={"home-banner"}>
                    <div className={"text-[30px] md:text-[60px] max-w-[650px] font-medium"}>Unlimited movies, TV shows, and more.</div>

                    <img src={"/logo.svg"} className={"w-36 md:w-56 absolute bottom-[-30px] md:bottom-[-50px]"} />
                </section>
            </Fragment>
        );
    } else {
        return <GetStarted/>
    }
}