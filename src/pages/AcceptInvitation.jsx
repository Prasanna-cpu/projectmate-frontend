import {Button} from "@/components/ui/button.jsx";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {acceptInvitation} from "@/redux/Project/Action.js";

const AcceptInvitation = () => {

    const dispatch=useDispatch()

    const location=useLocation()

    const navigate=useNavigate()

   function handleAcceptInvitation(){
       const urlParams=new URLSearchParams(location.search)
       const token=urlParams.get("token")

        dispatch(acceptInvitation({
            token,
            navigate
        }))
   }


    return (
        <div className={"h-[85vh] flex flex-col justify-center items-center"}>
            <h1 className={"py-5 font-semibold text-xl"}>
                You are invited to join the project
            </h1>
            <Button className={"p-4 bg-green-700"} onClick={handleAcceptInvitation}>
                Accept Invitation
            </Button>
        </div>
    );
};

export default AcceptInvitation;
