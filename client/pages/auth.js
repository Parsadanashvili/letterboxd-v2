import Card from "../components/UI/Card";
import CardHeader from "../components/UI/CardHeader";
import CardBody from "../components/UI/CardBody";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import {useEffect, useRef, useState} from "react";
import axios from "axios";

const Auth = () => {
    const [sentOtp, setSentOtp] = useState(false);
    const emailRef = useRef();
    const otpRef = useRef();

    const sendOTPHandler = () => {
        if(sentOtp) return;

        const email = emailRef.current.value;
        axios.post('http://localhost:3003/users', {email, username: 'Sickly', avatar: '1'})
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

        axios.post('http://localhost:3003/users/verifyOTP', {email, otp})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        if(sentOtp) {
            setTimeout(() => {
                setSentOtp(false);
            }, 180000);
        }
    }, [sentOtp]);

    return (
        <div className={"my-auto"}>
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
        </div>
    )
}

export default Auth
