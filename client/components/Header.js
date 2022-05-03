import Button from "./UI/Button";
import Styles from "../styles/Header.module.css"
import Link from "next/link";
import {useContext, useEffect, useRef, useState} from "react";
import AuthContext from "../Context/auth-context";
import {
    HomeIcon,
    FilmIcon,
    BookOpenIcon,
    MenuAlt3Icon,
    CollectionIcon,
    HeartIcon, LogoutIcon, UserIcon
} from "@heroicons/react/outline";

const Header = () => {
    const dropdown = useRef();
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const [isOpen, setIsOpen] = useState(false);

    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
    }

    // Track events outside scope
    const clickOutside = (e) => {
        if(dropdown.current && dropdown.current.contains(e.target)) {
            return;
        }
        setIsOpen(false)
    }

    useEffect(() => {
        document.addEventListener('mousedown', clickOutside);

        return () => {
            document.removeEventListener('mousedown', clickOutside);
        }
    }, [isOpen])

    return (
        <div className={Styles.header}>
            <div className={Styles.header__inner}>
                <div className={Styles["header__inner-start"]}>
                    <Link href={"/"}>
                        <img className={"w-[128px] h-[100%] cursor-pointer"} src={"/logo.svg"} alt={"Logo"}/>
                    </Link>
                </div>

                <div className={Styles["header__inner-end"]}>
                    {isLoggedIn ?
                        (
                            <ul className={"flex items-center space-x-8 text-gray-400"}>
                                <li>
                                    <Link href={"/"}>
                                        <div className={"flex items-center justify-center space-x-2 cursor-pointer hover:text-gray-200"}>
                                            <HomeIcon className={"h-6"}/>
                                            <div>Home</div>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/films"}>
                                        <div className={"flex items-center justify-center space-x-2 cursor-pointer hover:text-gray-200"}>
                                            <FilmIcon className={"h-6"}/>
                                            <div>Films</div>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/reviews"}>
                                        <div className={"flex items-center justify-center space-x-2 cursor-pointer hover:text-gray-200"}>
                                            <BookOpenIcon className={"h-6"}/>
                                            <div>Reviews</div>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/lists"}>
                                        <div className={"flex items-center justify-center space-x-2 cursor-pointer hover:text-gray-200"}>
                                            <MenuAlt3Icon className={"h-6"}/>
                                            <div>Lists</div>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/watchlist"}>
                                        <div className={"flex items-center justify-center space-x-2 cursor-pointer hover:text-gray-200"}>
                                            <CollectionIcon className={"h-6"}/>
                                            <div>Watchlist</div>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/likes"}>
                                        <div className={"flex items-center justify-center space-x-2 cursor-pointer hover:text-gray-200"}>
                                            <HeartIcon className={"h-6"}/>
                                            <div>Likes</div>
                                        </div>
                                    </Link>
                                </li>
                                <li className={"relative"}>
                                    <div onClick={toggleIsOpen} className={"rounded-full overflow-hidden w-[35px] h-[35px]"}>
                                        <img className={"cursor-pointer"} src={authCtx.user?.avatar} alt={"Avatar"} />
                                    </div>

                                    {isOpen && (
                                        <ul ref={dropdown} className={"absolute top-[130%] right-0 bg-[#1f1d36] space-y-1 shadow-2xl shadow-[#E9A6A6] w-[100%] min-w-[230px] p-2 rounded-xl"}>
                                            <li className={"cursor-pointer p-3 hover:bg-[#E9A6A6] hover:text-[#1F1D36] rounded-xl"}>
                                                <div className={"flex items-center space-x-3"}>
                                                    <UserIcon className={"h-6 w-6"}/>
                                                    <div>{authCtx.user?.username}</div>
                                                </div>
                                            </li>
                                            <li onClick={authCtx.logout} className={"cursor-pointer p-3 hover:bg-red-500 hover:text-white rounded-xl"}>
                                                <div className={"flex items-center space-x-3"}>
                                                    <LogoutIcon className={"h-6 w-6"}/>
                                                    <div>Logout</div>
                                                </div>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                            </ul>
                        )
                        :
                        (<Link href={"/auth"}>
                            <Button className={"py-1.5 px-14"}>Login</Button>
                        </Link>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Header
