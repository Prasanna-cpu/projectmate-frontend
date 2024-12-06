import {useParams} from "react-router-dom";
import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import {Tabs, TabsTrigger} from "@/components/ui/tabs.jsx";
import {TabsContent, TabsList} from "@radix-ui/react-tabs";
import CreateCommentForm from "@/pages/CreateCommentForm.jsx";
import CommentCard from "@/pages/CommentCard.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchIssuesById, updateIssueStatus} from "@/redux/Issue/Action.js";
import {fetchComments} from "@/redux/Comment/Action.js";

const IssueDetails = () => {

    const {projectId,issueId}=useParams()
    const dispatch=useDispatch()

    const {issue,comment} = useSelector(store => store)

    function handleUpdateIssueStatus(status){
        dispatch(updateIssueStatus({issueId,status}))
        console.log(status)
    }

    useEffect(() => {
        dispatch(fetchIssuesById(issueId))
        dispatch(fetchComments(issueId))
    }, [issueId]);

    return (
        <div className={"px-20 py-8 text-gray-400 p-10 rounded-lg"}>
            <div className="flex justify-between border p-10 rounded-lg">
                <ScrollArea className={"h-[80%] w-[60%] "}>
                    <div>
                        <h1 className={"text-lg font-semibold text-gray-400"}>{issue?.issueDetails?.data?.title}</h1>
                        <div className={"py-5"}>
                            <h2 className={"font-semibold text-gray-400"}>
                                <p className={"text-gray-400 text-sm mt-3"}>{issue?.issueDetails?.data?.description}</p>
                            </h2>
                        </div>
                        <div className={"mt-5"}>
                            <h1 className={"pb-3"}>Activity</h1>
                            <Tabs defaultValue="comments" className="w-[400px]">
                                <TabsList>
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="comments">Comments</TabsTrigger>
                                    <TabsTrigger value="history">History</TabsTrigger>
                                </TabsList>
                                <TabsContent value="all">
                                    <p>All content goes here.</p>
                                </TabsContent>
                                <TabsContent value="comments">
                                    <CreateCommentForm issueId={issueId}/>
                                    <div className={"mt-8 space-y-6"}>
                                        {
                                            comment?.comments?.data?.map((item) => <CommentCard item={item} key={item.id}/>)
                                        }
                                    </div>
                                </TabsContent>
                                <TabsContent value="history">
                                    <p>History content goes here.</p>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </ScrollArea>
                <div className="w-full lg:w-[30%] space-y-2">
                    <Select onValueChange={handleUpdateIssueStatus}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={"To Do"}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">To Do</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className={"border rounded-lg"}>
                        <p className={"border-b py-3 px-5"}>
                            Details
                        </p>
                        <div className={"p-5"}>
                            <div className={"space-y-7"}>
                                <div className={"flex gap-10 items-center"}>
                                    <p className={"w-[7rem]"}>Assignee</p>
                                    {
                                        issue?.issueDetails?.data?.assignee?.fullName ? (
                                        <div className={"flex items-center gap-3"}>
                                            <Avatar className={"h-8 w-8 text-xs"}>
                                                <AvatarFallback>
                                                    {issue?.issueDetails?.data?.assignee?.fullName[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <p>{issue?.issueDetails?.data?.assignee?.fullName}</p>
                                        </div>
                                    ):(
                                        <p>Unassigned</p>
                                        )
                                    }
                                </div>

                                <div className={"flex gap-10 items-center"}>
                                    <p className={"w-[7rem]"}>Labels</p>
                                    <p>None</p>
                                </div>

                                <div className={"flex gap-10 items-center"}>
                                    <p className={"w-[7rem]"}>Status</p>
                                    <Badge>
                                        {
                                            issue?.issueDetails?.data?.status
                                        }
                                    </Badge>
                                </div>

                                <div className={"flex gap-10 items-center"}>
                                    <p className={"w-[7rem]"}>Release</p>
                                    <p>10-12-2024</p>
                                </div>

                                <div className={"flex gap-10 items-center"}>
                                    <p className={"w-[7rem]"}>Reporter</p>
                                    <div className={"flex items-center gap-3"}>
                                        <Avatar className={"h-8 w-8 text-xs"}>
                                            <AvatarFallback>
                                                P
                                            </AvatarFallback>
                                        </Avatar>
                                        <p>Prem</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueDetails;
