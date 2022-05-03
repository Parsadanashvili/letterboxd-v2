import CardHeader from "../UI/CardHeader";
import CardBody from "../UI/CardBody";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Card from "../UI/Card";
import {useContext, useEffect, useRef, useState} from "react";
import api from "../../lib/api";
import AuthContext from "../../Context/auth-context";

const StepEmail = ({changeStep}) => {
    const authCtx = useContext(AuthContext);
    const [sentOtp, setSentOtp] = useState(false);
    const emailRef = useRef();
    const otpRef = useRef();

    useEffect(() => {
        if(sentOtp) {
            setTimeout(() => {
                setSentOtp(false);
            }, 180000);
        }
    }, [sentOtp]);

    const sendOTPHandler = () => {
        if(sentOtp) return;

        const email = emailRef.current.value;
        api().post('/auth', {email})
            .then(response => {
                alert('OTP sent, check email');
                setSentOtp(true);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const email = emailRef.current.value;
        const otp = +otpRef.current.value;

        api().post('http://localhost:3003/auth/verify', {email, otp})
            .then(async response => {
                await authCtx.login(response.data.access_token, response.data.user);
                if(response.data.user?.username) {
                    changeStep(2);
                } else {
                    changeStep(1);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <Card>
            <CardHeader title={"Log in"}/>
            <CardBody>
                <form onSubmit={submitHandler}>
                    <div className={"relative"}>
                        <Input ref={emailRef} label={"E-mail"} name={"email"} placeholder={"example@mail.com"} autocomplete={false}/>
                        <button type={"button"} onClick={sendOTPHandler} className={"text-[#E9A6A6] hover:bg-[#E9A6A6] hover:text-[#1F1D36] transition ease-in-out delay-100 h-10 mb-4 px-5 absolute bottom-[-15px] right-0.5 rounded-lg text-sm"}>Send OTP</button>
                    </div>
                    <Input ref={otpRef} label={"OTP"} name={"otp"} placeholder={"Enter OTP"} autocomplete={false}/>
                    <Button className={"w-[100%] py-3"}>Authenticate</Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default StepEmail
