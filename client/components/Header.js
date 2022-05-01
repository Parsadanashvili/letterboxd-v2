import Button from "./UI/Button";

const Header = () => {
    return (
        <header className={"bg-[#151328] px-5 py-3"}>
            <div className={"wrapper flex flex-row justify-between items-center"}>
                <div className={"max-w-[120px]"}>
                    <img src={"/logo.svg"}/>
                </div>

                <div className={""}>
                    <Button className={"py-1.5 px-14"}>Login</Button>
                </div>
            </div>
        </header>
    )
}

export default Header
