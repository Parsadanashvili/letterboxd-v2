import React, {useEffect, useRef} from 'react'
import Card from "../UI/Card";
import CardHeader from "../UI/CardHeader";
import CardBody from "../UI/CardBody";
import Input from "../UI/Input";
import Button from "../UI/Button";
import api from "../../lib/api";
import Cookies from "cookie-cutter";

const StepUsername = ({changeStep}) => {
    const usernameRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const username = usernameRef.current.value;

        if(!username.trim() || username.trim().length < 3) {
            alert('Username must be at least 3 characters long');
            return;
        }

        api().put('/users', {username})
            .then(async response => {
                if(response.data.message) {
                    const user = await JSON.parse(Cookies.get('user'));
                    user.username = username;
                    await Cookies.set('user', JSON.stringify(user));
                    changeStep(1);
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    return (
        <Card>
            <CardHeader title={"Enter Username"}/>
            <CardBody>
                <form onSubmit={submitHandler}>
                    <Input ref={usernameRef} name={"username"} label={"Username"} type={"text"} placeholder={"Enter Username"}/>
                    <Button className={"w-[100%] py-3"}>Next</Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default StepUsername
