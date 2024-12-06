import {Button} from "@/components/ui/button.jsx";
import {CheckCircleIcon} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {createPayment} from "@/redux/Payment/Action.js";

const SubscriptionCard = ({data}) => {

    const dispatch=useDispatch()

    const {auth}=useSelector(store=>store)

    function handleUpgrade(){
        dispatch(createPayment({
            planType:data.planType,
            jwt:auth.jwt || localStorage.getItem("jwt")
        }))
    }


    return (
        <div className={"rounded-xl bg-[#1b1b1b] bg-opacity-20 shadow-[#14173b] shadow-2xl card p-5 space-y-5 w-[18rem]"}>
            <p>
                {data.planName}
            </p>
            <p>
                <span className={"text-xl font-semibold"}>
                    {data.price===0 ? "FREE" : data.price}
                </span>
                <span className={"ml-2"}>
                    {data.planType==="FREE" ? "" : data.planType}
                </span>
            </p>
            {
                data.planType ==="ANNUALLY" && <p className={"text-green-600"}>20% off</p>
            }

            <Button className={"w-full"} onClick={()=>handleUpgrade()}>
                {data.buttonName}
            </Button>
            <div>
                {
                    data.features.map((item)=> (
                            <div className={"flex items-center gap-2 space-y-3"} key={item}>
                                <CheckCircleIcon className={"h-4 w-4"}/>
                                <p>
                                    {item}
                                </p>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default SubscriptionCard;
