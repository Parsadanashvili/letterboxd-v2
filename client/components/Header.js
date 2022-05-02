import Button from "./UI/Button";
import Styles from "../styles/Header.module.css"
import Link from "next/link";
import {useSelector} from "react-redux";

const Header = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    return (
        <div className={Styles.header}>
            <div className={Styles.header__inner}>
                <div className={"h-[100%]"}>
                    <Link href={"/"}>
                        <img className={"w-[128px]"} src={"/logo.svg"} alt={"Logo"}/>
                    </Link>
                </div>

                <div className={""}>
                    {isLoggedIn ? (
                        <Link href={"/profile"} passHref>
                            <Button className={"py-1.5 px-14"}>Profile</Button>
                        </Link>
                    ) : (
                        <Link href={"/auth"} passHref>
                            <Button className={"py-1.5 px-14"}>Login</Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header
