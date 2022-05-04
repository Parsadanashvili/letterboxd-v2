import {useContext, useState} from "react";
import AuthContext from "../../Context/auth-context";
import Button from "../../components/UI/Button";
import Head from "next/head";
import axios from "axios";
import {isEmpty} from "lodash";
import Modal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";

const id = ({user}) => {
    const authCtx = useContext(AuthContext);
    const [showModal, setShowModal] = useState(true);

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
                                <img src={user?.avatar} alt={"Avatar"}/>
                            </div>

                            <div className={"ml-6 space-y-3"}>
                                <h1 className={"text-2xl"}>{user?.username}</h1>
                                {(user?._id === authCtx?.user?._id) &&
                                    <Button className={"rounded-md py-1 px-6 text-sm"}>Edit Profile</Button>}
                            </div>
                        </div>

                        <div
                            className={"my-5 px-3 grid grid-flow-row-dense grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x items-center justify-center w-[100%] lg:w-[50%]"}>
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
            <Modal title={"Upload Avatar"} onClose={() => setShowModal(false)} show={showModal}>
                <Input type={"file"} />
            </Modal>
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    let user = {};
    try {
        const res = await axios.get('/users/' + ctx.params.id);
        user = res.data;
    } catch (e) {
        console.log(e);
    }

    if(isEmpty(user)){
        return {
            notFound: true,
        }
    }

    return {
        props: {
            user,
        },
    }
}

export default id
