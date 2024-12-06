import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Button} from "@/components/ui/button.jsx";
import {DotsVerticalIcon, PersonIcon} from "@radix-ui/react-icons";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import UserList from "@/pages/UserList.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteIssue} from "@/redux/Issue/Action.js";
import issueDetails from "@/pages/IssueDetails.jsx";

const IssueCard = ({item,projectId}) => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {issue}=useSelector(store=>store)
    function handleDeleteIssue(){
        dispatch(deleteIssue(item.id))
    }
    console.log("Issue store : " , issue)


    return (
        <Card className={"rounded-md py-1 pb-2"}>
            <CardHeader>
                <div className={"flex justify-between items-center"}>
                    <CardTitle onClick={()=>navigate(`/project/${projectId}/issue/${item.id}`)} className={"cursor-pointer"}>
                        {item?.title}
                    </CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button className={"rounded-full"} size={"icon"} variant={"ghost"}>
                                <DotsVerticalIcon/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                In progress
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Done
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleDeleteIssue}>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className={"py-0"}>
                <div className={"flex items-center justify-between"}>

                    <DropdownMenu className={"w-[30rem] border border-red-400"}>
                        <DropdownMenuTrigger>
                            <Button size={"icon"} className={"bg-rose-900 hover:text-blue-50 text-white rounded-full"}>
                                <Avatar>
                                    <AvatarFallback>
                                        <PersonIcon/>
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <UserList item={item}/>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
        </Card>
    );
};

export default IssueCard;
