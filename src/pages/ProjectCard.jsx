import {Card} from "@/components/ui/card.jsx";
import {DotFilledIcon, DotsVerticalIcon} from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteProject} from "@/redux/Project/Action.js";

const ProjectCard = ({data}) => {



    const dispatch=useDispatch()
    const navigate=useNavigate()

    function handleDelete(){
        dispatch(deleteProject({projectId:data?.id}))
    }

    return (
        <div>
            <Card className={"p-5 w-full lg:max-w-full"}>
                <div className={"space-y-5"}>
                    <div className={"flex justify-between"}>
                        <div className={"flex items-center gap-5"}>
                            <h1 className={"cursor-pointer font-bold text-lg"} onClick={()=>navigate(`/project/${data?.id}`)}>
                                {data?.name}
                            </h1>
                            <DotFilledIcon/>
                            <p className={"text-sm text-gray-400"}>
                                {data?.category}
                            </p>
                        </div>
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant={"ghost"} className={"rounded-full"} size={"icon"}>
                                        <DotsVerticalIcon></DotsVerticalIcon>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        Update
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleDelete}>
                                        Delete
                                    </DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                    </div>
                    <p>
                        {data?.description}
                    </p>
                    <div className={"flex flex-wrap gap-2 items-center"}>
                        {
                            data?.tags?.map((item) => (
                                <Badge key={item} variant={"outline"} className={"bg-rose-700"}>
                                    {item}
                                </Badge>
                            ))
                        }
                    </div>
                </div>

            </Card>
        </div>
    );
};

export default ProjectCard;
