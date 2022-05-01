import Button from "../components/UI/Button";
import {Fragment} from "react";
import Link from "next/link";

export default function Home() {
    return (
        <Fragment>
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