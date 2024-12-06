import {useState} from "react";
import SignUp from "@/pages/SignUp.jsx";
import Login from "@/pages/Login.jsx";
import {Button} from "@/components/ui/button.jsx";
import "../Auth.css"


const Auth = () => {
    const [active, setActive] = useState(true);
    return (
        <div className={"loginContainer"}>
            <div className={"box h-[30rem] w-[25rem] "}>
                <div className={"minContainer login "}>
                    <div className={"loginBox w-full px-10 space-y-5"}>
                        {active ? <SignUp /> : <Login />}

                        <div className={"flex items-center justify-center"}>
                            <span>Already have account ? </span>
                            <Button onClick={() => setActive(!active)} variant="ghost">
                                {active ? "Sign In" : "Sign Up"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;