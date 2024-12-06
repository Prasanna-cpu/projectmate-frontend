import SubscriptionCard from "@/pages/SubscriptionCard.jsx";
import {annualPlan, freePlan, paidPlan} from "@/lib/Plans.js";
import {useSelector} from "react-redux";

const Subscription = () => {

    const {subscription}=useSelector(store=>store)

    return (
        <div className={"p-10"}>
            <h1 className={"text-5xl font-semibold py-5 pb-16 text-center"}>Billing Plans</h1>
            <div className={"flex flex-col lg:flex-row justify-center items-center gap-9"}>
                {
                    subscription?.userSubscription?.data?.subscriptionType === "FREE" && <SubscriptionCard
                        data={{
                            planName:"Free",
                            features:freePlan,
                            planType:"FREE",
                            price:0,
                            buttonName: "Current Plan"}}
                    />
                }
                <SubscriptionCard
                    data={{
                        planName:"Monthly",
                        features:paidPlan,
                        planType:"MONTHLY",
                        price:599,
                        buttonName:subscription?.userSubscription?.data?.subscriptionType ==="MONTHLY" ?"Current Plan":
                            subscription?.userSubscription?.data?.subscriptionType ==="ANNUALLY"?"Switch to monthly subscription":
                                "Get Started"
                }}
                />
                <SubscriptionCard
                    data={{
                        planName:"Annually",
                        features:annualPlan,
                        planType:"ANNUALLY",
                        price:6299,
                        buttonName:subscription?.userSubscription?.data?.subscriptionType ==="ANNUALLY"?"Current Plan":"Get Started"}}
                />
            </div>
        </div>
    );
};

export default Subscription;
