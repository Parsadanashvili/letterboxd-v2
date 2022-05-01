import Button from "./UI/Button";
import Styles from "../styles/Header.module.css"
import Link from "next/link";

const Header = () => {
    return (
        <div className={Styles.header}>
            <div className={Styles.header__inner}>
                <div className={"h-[100%]"}>
                    <Link href={"/"}>
                        <img className={"w-[128px]"} src={"/logo.svg"} alt={"Logo"}/>
                    </Link>
                </div>

                <div className={""}>
                    <Link href={"/auth"} passHref>
                        <Button className={"py-1.5 px-14"}>Login</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header
