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
                <img src={"/logo.svg"} className={"w-36 md:w-56"} />

                <div className={"text-[20px] md:text-[40px] max-w-[650px] font-medium  absolute bottom-[-30px] md:bottom-[-60px]"}>Track films you’ve watched. Save those you want to see. Tell your friends what’s good</div>
            </section>

            <div className={"flex justify-center items-center my-auto"}>
                <Link href={"/auth"} passHref>
                    <Button className={"px-12 py-3"}>Get Started</Button>
                </Link>
            </div>
        </Fragment>
    )
}