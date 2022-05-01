import Card from "../components/UI/Card";
import CardHeader from "../components/UI/CardHeader";
import CardBody from "../components/UI/CardBody";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

const Auth = () => {
    return (
        <div className={"my-auto"}>
            <Card>
                <CardHeader title={"Log in"}/>
                <CardBody>
                    <div className={"relative"}>
                        <Input label={"E-mail"} name={"email"} placeholder={"example@mail.com"} autocomplete={false}/>
                        <button className={"text-[#E9A6A6] hover:bg-[#E9A6A6] hover:text-[#1F1D36] transition ease-in-out delay-100 h-10 mb-4 px-5 absolute bottom-[-15px] right-0 rounded-lg text-sm"}>Send OTP</button>
                    </div>
                    <Input label={"OTP"} name={"otp"} placeholder={"Enter OTP"} autocomplete={false}/>
                    <Button className={"w-[100%] py-3"}>Authenticate</Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default Auth
