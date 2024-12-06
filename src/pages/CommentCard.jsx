import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {Button} from "@/components/ui/button.jsx";
import {TrashIcon} from "@radix-ui/react-icons";
import {deleteComment} from "@/redux/Comment/Action.js";
import {useDispatch, useSelector, useStore} from "react-redux";

const CommentCard = ({item}) => {

    const dispatch = useDispatch();

    function handleDeleteComment(){
        dispatch(deleteComment(item?.id))
    }

    const {comment}=useSelector(store=>store)
    console.log(comment)

    return (
        <div className={"flex justify-between"}>
            <div className={"flex items-center gap-4"}>
                <Avatar>
                    <AvatarFallback>
                        {item?.user?.fullName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className={"space-y-1"}>
                    <p>{item?.user?.fullName}</p>
                    <p>{item?.content}</p>
                </div>
                <Button className={"rounded-full"} variant={"ghost"} size={"icon"} onClick={handleDeleteComment}>
                    <TrashIcon/>
                </Button>
            </div>
        </div>
    );
};

export default CommentCard;
