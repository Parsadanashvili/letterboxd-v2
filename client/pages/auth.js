import StepAvatar from "../components/Auth/StepAvatar";
import StepUsername from "../components/Auth/StepUsername";
import StepEmail from "../components/Auth/StepEmail";
import {useState} from "react";

const steps = {
    1: StepEmail,
    2: StepUsername,
    3: StepAvatar,
}

const Auth = () => {
    const [step, setStep] = useState(1);
    const Step = steps[step];

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
