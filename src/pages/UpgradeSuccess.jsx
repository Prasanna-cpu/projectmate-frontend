import {Card} from "@/components/ui/card.jsx";
import {CheckCircleIcon} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUserSubscription, upgradeSubscription} from "@/redux/Subscription/Action.js";

const UpgradeSuccess = () => {

    const navigate=useNavigate()

    const {subscription,auth}=useSelector(store=>store)

    const dispatch=useDispatch()

    const queryParams=new URLSearchParams(location.search)

    const paymentId=queryParams.get("payment_id")
    const planType=queryParams.get("planType")

    console.log("Subscription store : ",subscription)

    useEffect(() => {
        dispatch(upgradeSubscription({
            planType
        }))
        dispatch(getUserSubscription(auth.jwt || localStorage.getItem("jwt")))
    }, []);


    return (
        <div className={"flex justify-center"}>
            <Card className={"mt-20 space-y-5 flex flex-col items-center p-20"}>
                <div className={"flex items-center gap-4"}>
                    <CheckCircleIcon className={"h-9 w-9 text-green-500"}>
                        <p className={"text-xl"}>
                            Plan Upgraded Successfully
                        </p>
                    </CheckCircleIcon>
                </div>

                <div className={"space-y-3"}>
                    <p className={"text-green-600"}>
                        Your plan begins at : {subscription?.userSubscription?.data?.subscriptionStartDate}
                    </p>
                    <p className={"text-red-600"}>
                        Your plan ends at: {subscription?.userSubscription?.data?.subscriptionEndDate}
                    </p>
                    <p className={"text-yellow-500"}>
                        Plan Type: {subscription?.userSubscription?.data?.subscriptionType}
                    </p>
                </div>
                <Button
                    onClick={()=>navigate("/")}
                >
                    Go to Home
                </Button>
            </Card>
        </div>
    );
};

export default UpgradeSuccess;
