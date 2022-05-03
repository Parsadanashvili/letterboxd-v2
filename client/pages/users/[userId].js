import {useContext} from "react";
import AuthContext from "../../Context/auth-context";
import Button from "../../components/UI/Button";
import Head from "next/head";

const userId = ({user}) => {
    const authCtx = useContext(AuthContext);

    return (
        <>
            <Head>
                <title>User</title>
            </Head>
            <div className={"flex items-center justify-center w-[100%] my-3 lg:my-10 text-white"}>
                <div className={"w-[100%] lg:w-[80%]"}>
                    <div className={"flex flex-col lg:flex-row items-center justify-between"}>
                        <div className={"my-5 flex flex-row items-center"}>
                            <div className={"rounded-full overflow-hidden w-[120px] h-[120px]"}>
                                <img src={authCtx.user?.avatar} alt={"Avatar"} />
                            </div>

                            <div className={"ml-6 space-y-3"}>
                                <h1 className={"text-2xl"}>{authCtx.user?.username}</h1>
                                <Button className={"rounded-md py-1 px-6 text-sm"}>Edit Profile</Button>
                            </div>
                        </div>

                        <div className={"my-5 px-3 grid grid-flow-row-dense grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x items-center justify-center w-[100%] lg:w-[50%]"}>
                            <div className={"flex flex-col items-center justify-center"}>
                                <div className={"text-[28px] font-bold cursor-pointer"}>
                                    67
                                </div>
                                <div className={"text-sm text-gray-500 cursor-pointer"}>
                                    FILMS
                                </div>
                            </div>

                            <div className={"flex flex-col items-center justify-center"}>
                                <div className={"text-[28px] font-bold cursor-pointer"}>
                                    1
                                </div>
                                <div className={"text-sm text-gray-500 cursor-pointer"}>
                                    THIS YEAR
                                </div>
                            </div>

                            <div className={"flex flex-col items-center justify-center"}>
                                <div className={"text-[28px] font-bold cursor-pointer"}>
                                    0
                                </div>
                                <div className={"text-sm text-gray-500 cursor-pointer"}>
                                    LISTS
                                </div>
                            </div>

                            <div className={"flex flex-col items-center justify-center"}>
                                <div className={"text-[28px] font-bold cursor-pointer"}>
                                    3
                                </div>
                                <div className={"text-sm text-gray-500 cursor-pointer"}>
                                    FOLLOWING
                                </div>
                            </div>

                            <div className={"flex flex-col items-center justify-center"}>
                                <div className={"text-[28px] font-bold cursor-pointer"}>
                                    4
                                </div>
                                <div className={"text-sm text-gray-500 cursor-pointer"}>
                                    FOLLOWERS
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = (ctx) => {
    const user = {};

    return {
        props: {
            user
        }
    }
}

export default userId
