import Button from "../components/UI/Button";
import {Fragment} from "react";

export default function Home() {
    return (
        <Fragment>
            <section className={"wrapper border-b border-gray-500"}>
                <div className={"m-14 text-center text-white"}>
                    <div className={"text-[30px] md:text-[60px] max-w-[650px] mb-6 mx-auto"}>Unlimited movies, TV shows, and more.</div>

                    <div className={"mx-auto w-[800px] relative"}>
                        <input placeholder={"E-mail address"} className={"w-[100%] placeholder-[rgb(0,0,0,40%)] text-[rgb(0,0,0,40%)] bg-[#A5A5AF] px-4 py-4 rounded-lg"} />
                        <Button className={"absolute right-0 top-0 bg-[#FFFFFF60] rounded-lg px-10 py-4 "}>
                            <span className={"text-gray-800"}>Get Started</span>
                        </Button>
                    </div>
                </div>
            </section>

            <section className={"wrapper"}>

            </section>
        </Fragment>
    )
}