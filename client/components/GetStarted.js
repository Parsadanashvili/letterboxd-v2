import Button from "../components/UI/Button";
import {Fragment} from "react";
import Link from "next/link";
import Head from "next/head";

export default function GetStarted() {
    return (
        <Fragment>
            <Head>
                <title>Letterboxd V2 - Get Started</title>
                <meta name="description" content="Letterboxd V2" />
            </Head>

            <section className={"home-banner"}>
                <div className={"text-[30px] md:text-[60px] max-w-[650px] font-medium"}>Unlimited movies, TV shows, and more.</div>

                <img src={"/logo.svg"} className={"w-36 md:w-56 absolute bottom-[-30px] md:bottom-[-50px]"} />
            </section>

            <div className={"flex justify-center items-center my-auto"}>
                <Link href={"/auth"} passHref>
                    <Button className={"px-12 py-3"}>Get Started</Button>
                </Link>
            </div>
        </Fragment>
    )
}