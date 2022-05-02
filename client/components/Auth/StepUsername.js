import React, {useRef} from 'react'
import Card from "../UI/Card";
import CardHeader from "../UI/CardHeader";
import CardBody from "../UI/CardBody";
import Input from "../UI/Input";
import Button from "../UI/Button";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/Auth";

const StepUsername = ({changeStep}) => {
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.auth.access_token);
    const usernameRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const username = usernameRef.current.value;

        if(!username.trim() || username.trim().length < 3) {
            alert('Username must be at least 3 characters long');
            return;
        }

        axios.post('http://localhost:3003/users/setUsername', {username}, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
        .then(async response => {
            if(response.data.message) {
                dispatch(authActions.setUsername(username));
                changeStep(3);
            } else {
                throw new Error('Something went wrong');
            }
        })
        .catch(error => {
            console.log(error.response.data.message);
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
