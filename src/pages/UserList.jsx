import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {assignedUserToIssue} from "@/redux/Issue/Action.js";

const UserList = ({item}) => {
    const {project}=useSelector(store=>store)
    console.log("Project Store : ", project)
    console.log(item)
    const dispatch=useDispatch()
    function handleAssignedIssueToUser(userId){
        if (!item?.id) {
            console.error("Error: issueId is undefined");
            return;
        }
        dispatch(assignedUserToIssue({
            issueId:item?.id,
            userId
        }))
    }
    return (
        <div>
            <div className={"space-y-2"}>
                <div className={"border rounded-md"}>
                    <p className={"py-2 px-3"}>
                        {item?.assignee?.fullName || "Unassigned"}
                    </p>
                </div>
                {
                    project?.projectDetails?.data?.teams?.map((item)=> (
                        <div key={item}
                            className={"py-2 hover:bg-slate-800 cursor-pointer flex items-center space-x-4 rounded-md border px-4"}
                             onClick={()=>handleAssignedIssueToUser(item?.id)}
                        >
                            <Avatar>
                                <AvatarFallback>
                                    {item?.fullName?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className={"space-y-1"}>
                                <p className={"text-sm leading-normal"}>{item?.fullName}</p>
                                <p className={"text-sm text-muted-foreground"}>@{item?.fullName?.toLowerCase().replace(/\s+/g, "")}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default UserList;
