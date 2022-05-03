import {useContext} from "react";
import AuthContext from "../../Context/auth-context";
import Link from "next/link";
import {
    BookOpenIcon,
    CollectionIcon,
    FilmIcon,
    HomeIcon,
    LogoutIcon,
    MenuAlt3Icon,
    HeartIcon
} from "@heroicons/react/outline";

const Sidebar = () => {
    const authCtx = useContext(AuthContext);

    return (
        <div className={"fixed bottom-0 right-0 z-[99999] bg-[#151328] max-w-[300px] w-[100%] h-[calc(100vh-95px)] shadow-2xl"}>
            <Link href={"/profile"}>
                <div className={"flex items-center justify-end m-7"}>
                    <div className={"mr-3"}>
                        <p className={"text-white cursor-pointer"}>{authCtx.user?.username}</p>
                    </div>
                    <div className={"rounded-full overflow-hidden w-[50px] h-[50px] cursor-pointer"}>
                        <img src={authCtx.user?.avatar} alt={"Avatar"}/>
                    </div>
                </div>
            </Link>

            <ul className={"mt-12 space-y-3 text-gray-300"}>
                <li className={"cursor-pointer p-3 hover:bg-[#1f1d36]"}>
                    <Link href={"/"}>
                        <div className={"flex justify-end items-center w-[100%] space-x-3 cursor-pointer px-7"}>
                            <HomeIcon className={"h-6"}/>
                            <div>Home</div>
                        </div>
                    </Link>
                </li>

                <li className={"cursor-pointer p-3 hover:bg-[#1f1d36]"}>
                    <Link href={"/films"}>
                        <div className={"flex justify-end items-center space-x-3 cursor-pointer px-7"}>
                            <FilmIcon className={"h-6"}/>
                            <div>Films</div>
                        </div>
                    </Link>
                </li>

                <li className={"cursor-pointer p-3 hover:bg-[#1f1d36]"}>
                    <Link href={"/films"}>
                        <div className={"flex justify-end items-center space-x-3 cursor-pointer px-7"}>
                            <BookOpenIcon className={"h-6"}/>
                            <div>Reviews</div>
                        </div>
                    </Link>
                </li>

                <li className={"cursor-pointer p-3 hover:bg-[#1f1d36]"}>
                    <Link href={"/lists"}>
                        <div className={"flex justify-end items-center space-x-3 cursor-pointer px-7"}>
                            <MenuAlt3Icon className={"h-6"}/>
                            <div>Lists</div>
                        </div>
                    </Link>
                </li>

                <li className={"cursor-pointer p-3 hover:bg-[#1f1d36]"}>
                    <Link href={"/films"}>
                        <div className={"flex justify-end items-center space-x-3 cursor-pointer px-7"}>
                            <CollectionIcon className={"h-6"}/>
                            <div>Watchlist</div>
                        </div>
                    </Link>
                </li>

                <li className={"cursor-pointer p-3 hover:bg-[#1f1d36]"}>
                    <Link href={"/films"}>
                        <div className={"flex justify-end items-center space-x-3 cursor-pointer px-7"}>
                            <HeartIcon className={"h-6"}/>
                            <div>Likes</div>
                        </div>
                    </Link>
                </li>

                <li onClick={authCtx.logout} className={"cursor-pointer p-3 hover:bg-red-500 text-gray-300"}>
                    <div className={"flex justify-end items-center space-x-3 px-7"}>
                        <LogoutIcon className={"h-6 w-6"}/>
                        <div>Logout</div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
