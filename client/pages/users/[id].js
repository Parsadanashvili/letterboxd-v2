import {useContext, useState} from "react";
import AuthContext from "../../Context/auth-context";
import Button from "../../components/UI/Button";
import Head from "next/head";
import axios from "axios";
import {isEmpty} from "lodash";
import Modal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";
import {Cropper} from "react-cropper";
import "cropperjs/dist/cropper.css";
import {toast} from "react-hot-toast";

const id = ({user}) => {
    const authCtx = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);

    const [cropper, setCropper] = useState();
    const [image, setImage] = useState("");

    const handleImage = (e) => {
        try {
            e.preventDefault();
            let files;
            if (e.dataTransfer) {
                files = e.dataTransfer.files;
            } else if (e.target) {
                files = e.target.files;
            }
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(files[0]);
            e.target.value = null;
        } catch (e) {
            setImage(null);
            e.target.value = null;
            toast.error("Canceled or failed to crop the image.");
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setImage(null);
    };

    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n) {
            u8arr[n - 1] = bstr.charCodeAt(n - 1)
            n -= 1 // to make eslint happy
        }
        return new File([u8arr], filename, { type: mime })
    }

    const getCropData = async (e) => {
        e.preventDefault();
        if (typeof cropper !== "undefined") {
            let imagedata = await cropper.getCroppedCanvas().toDataURL("image/jpeg");
            const file = dataURLtoFile(imagedata, 'avatar.jpg');
            const data = new FormData()
            data.append('avatar', file)

            axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
            axios.post('/users/', data).then(response => {
                if(response.data.avatar) {
                    authCtx.setAvatar({...authCtx.user, avatar: response.data.avatar});
                    toast.success("Avatar updated successfully.");
                }
            })
        }
        return;
    };

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
                                <img src={user?.avatar} alt={"Avatar"} className={"cursor-pointer"} onClick={() => setShowModal(true)}/>
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
            <Modal title={"Upload Avatar"} onClose={handleClose} show={showModal}>
                {image && (
                    <Cropper
                        style={{ height: 400, width: "100%" }}
                        zoomTo={0.5}
                        initialAspectRatio={1}
                        aspectRatio={1}
                        src={image}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                        onInitialized={(instance) => {
                            setCropper(instance);
                        }}
                        guides={true}
                    />
                )}
                {!image ? (
                    <Input type={"file"} onChange={handleImage}/>
                ) : (
                    <div className={"flex justify-between mt-8"}>
                        <Button className={"rounded-md py-2 px-12 text-sm"} onClick={getCropData}>
                            Crop
                        </Button>
                        <Button className={"rounded-md bg-gray-500 py-2 px-12 text-sm"} onClick={() => setImage(null)}>
                            Cancel
                        </Button>
                    </div>
                )}
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
