import StepUsername from "../components/Auth/StepUsername";
import StepEmail from "../components/Auth/StepEmail";
import {useState} from "react";
import * as cookie from 'cookie-cutter'
import {isEmpty} from "lodash";
import Head from "next/head";

const steps = {
    1: StepEmail,
    2: StepUsername,
}

const Auth = ({currentStep}) => {
    const [step, setStep] = useState(currentStep);
    const Step = steps[step];

    const handleChangeStep = (next) => {
        let nextStep = step + next || 1;

        if (steps[nextStep] != null) {
            setStep(nextStep);
        }
    }

    return (
        <>
            <Head>
                <title>Authenticate</title>
                <meta name="description" content="Authenticate" />
            </Head>
            <div className={"my-auto"}>
                <Step changeStep={handleChangeStep}/>
            </div>
        </>
    )
}

export const getServerSideProps = (ctx) => {
    let step = 1;

    const getCookie = ctx.req.headers.cookie
    const user = JSON.parse(cookie(getCookie).get('user') ?? '{}');

    if(!isEmpty(user) && !user.username) {
        step = 2;
    } else {

    }

    return {
        redirect: {
            permanent: false,
            destination: "/",
        },
        props: {
            currentStep: step
        }
    }
}

export default Auth
