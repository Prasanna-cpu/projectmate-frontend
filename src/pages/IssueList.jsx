import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import IssueCard from "@/pages/IssueCard.jsx";
import {Button} from "@/components/ui/button.jsx";
import {PlusIcon} from "@radix-ui/react-icons";
import CreateIssueForm from "@/pages/CreateIssueForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchProjectById} from "@/redux/Project/Action.js";
import {fetchIssuesByProjectId} from "@/redux/Issue/Action.js";
import {useParams} from "react-router-dom";

const IssueList = ({status,title}) => {
    const dispatch=useDispatch()

    const {id}=useParams()

    const {issue}=useSelector(store=>store)

    console.log("issue store : ", issue)

    useEffect(() => {
        dispatch(fetchIssuesByProjectId(id))
    },[id]);



    return (
        <div>
            <Dialog>
                <Card className={"w-full md:w-[300px] lg:w-[310px]"}>
                    <CardHeader>
                        <CardTitle>
                            {title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className={"px-2"}>
                        <div className={"space-y-2"}>
                            {
                               issue?.issues?.data?.filter((issue=>issue.status===status)).map((item)=><IssueCard
                                   item={item}
                                   projectId={id}
                                   key={item.id}
                               />)
                            }
                        </div>
                    </CardContent>
                    <CardFooter>
                        <DialogTrigger>
                            <Button variant={"outline"} className={"w-full border flex items-center gap-2"}>
                                <PlusIcon/>
                                Create Issue
                            </Button>
                        </DialogTrigger>
                    </CardFooter>
                </Card>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Create New Issue
                        </DialogTitle>
                        <CreateIssueForm status={status}/>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default IssueList;
