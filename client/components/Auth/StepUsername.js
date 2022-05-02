import React from 'react'
import Card from "../UI/Card";
import CardHeader from "../UI/CardHeader";
import CardBody from "../UI/CardBody";
import Input from "../UI/Input";
import Button from "../UI/Button";

const StepUsername = ({changeStep}) => {
    return (
        <Card>
            <CardHeader title={"Enter Username"}/>
            <CardBody>
                <form>
                    <Input type={"text"} placeholder={"Username"}/>
                    <Button onClick={() => changeStep()}>Next</Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default StepUsername
