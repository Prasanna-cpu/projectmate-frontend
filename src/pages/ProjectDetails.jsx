import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {DialogClose} from "@radix-ui/react-dialog";
import {PlusIcon} from "@radix-ui/react-icons";
import InviteUserForm from "@/pages/InviteUserForm.jsx";
import IssueList from "@/pages/IssueList.jsx";
import ChatBox from "@/pages/Chatbox.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchProjectById} from "@/redux/Project/Action.js";
import {useParams} from "react-router-dom";

const ProjectDetails = () => {

    const dispatch=useDispatch()
    const {id}=useParams()
    const {project}=useSelector(store=>store)


    function handleProjectInvitation(){

    }

    useEffect(() => {
        dispatch(fetchProjectById(id))
    }, [id]);

    return (
        <div>
            <div className={"mt-5 lg:px-10"}>
                        <div className={"lg:flex gap-5 justify-between pb-4"}>
                            <ScrollArea className={"h-screen lg:w-[69%] pb-10 w-full"}>
                                <div className={"pb-10 w-full"}>
                                    <h1 className={"text-xl pb-5 font-semibold"}>{project?.projectDetails?.data?.name}</h1>
                                    <div className={"space-y-5 pb-10"}>
                                        <p className={"w-full md:max-w-lg lg:max-w-xl text-gray-400"}>{project?.projectDetails?.data?.description}</p>
                                    </div>
                                    <div className={"flex"}>
                                        <p>Project Lead:</p>
                                        <p className={"ml-3"}> {project?.projectDetails?.data?.owner?.fullName}</p>
                                    </div>
                                    <div className={"flex mt-7"}>
                                        <p className={"w-36"}>Members: </p>
                                        <div className={"flex items-center gap-2"}>
                                            {
                                                project?.projectDetails?.data?.teams?.map((item) => (
                                                    <Avatar key={item} className={"cursor-pointer"}>
                                                        <AvatarFallback>{item.fullName.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                ))
                                            }
                                        </div>
                                        <Dialog>
                                            <DialogTrigger>
                                                <DialogClose>
                                                    <Button className={"ml-2"} size={"sm"} variant={"outline"} onClick={handleProjectInvitation}>
                                                        <span>Invite</span>
                                                        <PlusIcon className={"w-3 h-3"}/>
                                                    </Button>
                                                </DialogClose>

                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>Invite user</DialogHeader>
                                                <InviteUserForm/>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                    <div className={"flex mt-7"}>
                                        <p className={"w-36"}>Category:</p>
                                        <p>{project?.projectDetails?.data?.category}</p>
                                    </div>
                                    <div className={"flex mt-7"}>
                                        <p className={"w-36"}>Project Lead:</p>
                                        <Badge>{project?.projectDetails?.data?.owner?.fullName}</Badge>
                                    </div>

                                    <section>
                                        <p className={"py-5 border-b text-lg -tracking-wider"}>Tasks</p>
                                        <div className={"lg:flex md:flex gap-3 justify-between py-5"}>
                                            <IssueList status={"pending"} title={"Todo List"}/>
                                            <IssueList status={"in_progress"} title={"In progress"}/>
                                            <IssueList status={"done"} title={"Done"}/>
                                        </div>
                                    </section>
                                </div>
                            </ScrollArea>

                            <div className={"lg:w-[30%] rounded-md sticky right-5 top-10"}>
                                <ChatBox/>
                            </div>

                        </div>

            </div>
        </div>
    );
};

export default ProjectDetails;
