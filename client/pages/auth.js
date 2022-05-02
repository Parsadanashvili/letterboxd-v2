import StepAvatar from "../components/Auth/StepAvatar";
import StepUsername from "../components/Auth/StepUsername";
import StepEmail from "../components/Auth/StepEmail";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {redirect} from "next/dist/server/api-utils";

const steps = {
    1: StepEmail,
    2: StepUsername,
    3: StepAvatar,
}

const Auth = () => {
    const user = useSelector(state => state.auth.user);
    const [step, setStep] = useState(1);
    const Step = steps[step];

    useEffect(() => {
        if(user && !user.username) {
            setStep(2)
        } else if(!user) {
            setStep(1);
        } else if (user.username && !user.avatar) {
            setStep(3);
        } else {
            redirect('/movies');
        }
    }, [user])

    const handleChangeStep = () => {
        let nextStep = step + 1;

        if (steps[nextStep] != null) {
            setStep(nextStep);
        }
    }

    return (
        <div className={"my-auto"}>
            <Step changeStep={handleChangeStep}/>
        </div>
    )
}

export default Auth
