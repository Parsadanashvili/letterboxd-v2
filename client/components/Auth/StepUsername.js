import React, {useEffect, useRef} from 'react'
import Card from "../UI/Card";
import CardHeader from "../UI/CardHeader";
import CardBody from "../UI/CardBody";
import Input from "../UI/Input";
import Button from "../UI/Button";
import api from "../../lib/api";
import Cookies from "cookie-cutter";
import axios from "axios";
import {toast} from "react-hot-toast";

const StepUsername = ({changeStep}) => {
    const usernameRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const username = usernameRef.current.value;

        if(!username.trim() || username.trim().length < 3) {
            toast.error('Username must be at least 3 letters long', {
                style: {
                    borderRadius: '10px',
                    padding: '16px',
                    color: '#FFFAEE',
                    fontSize: '14px',
                    backgroundColor: '#1f1d36',
                },
                iconTheme: {
                    color: '#E9A6A6',
                    secondary: '#FFFAEE',
                },
            });
            return;
        }

        axios.put('/users', {username})
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
