import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {Input} from "@/components/ui/input.jsx";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button.jsx";
import {PaperPlaneIcon} from "@radix-ui/react-icons";
import {useDispatch, useSelector} from "react-redux";
import {fetchChatByProjectId, fetchChatMessages, sendMessage} from "@/redux/Chat/Action.js";
import {useParams} from "react-router-dom";

const ChatBox = () => {

    const dispatch=useDispatch()

    const {auth,chat}=useSelector(store=>store)

    console.log("Chat in chatbox :",chat)
    const {id}=useParams()

    const [message,setMessage]=useState("")

    useEffect(() => {
        dispatch(fetchChatByProjectId(id))
    }, [id]);

    useEffect(() => {
        dispatch(fetchChatMessages(chat?.chat?.data?.id))
    }, [id]);




    function handleMessageChange(e){

        setMessage(e.target.value)
    }

    function handleSendMessage(){
        dispatch(sendMessage({
            senderId:auth?.user?.data?.id,
            projectId:id,
            content:message
        }))
        console.log("Message :",message)
        setMessage("")
    }

    return (
        <div className={"sticky"}>
            <div className={"border  rounded-lg"}>
                <h1 className={"border-b p-5"}>
                    Chat box
                </h1>
                <ScrollArea className={"h-[32rem] w-full p-5 flex gap-3 flex-col"}>
                    {
                        chat?.messages?.data?.map((item)=> (
                            item.sender.id === auth.user.id ? <div className={"flex gap-2 mb-2 border justify-end"} key={item}>
                                    <Avatar>
                                        <AvatarFallback>
                                            {item?.sender?.fullName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className={"space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl"}>
                                        <p>
                                            {item?.sender?.fullName}
                                        </p>
                                        <p className={"text-gray-300"}>
                                            {item?.content}
                                        </p>
                                    </div>
                                </div> :
                                <div className={"flex gap-2 mb-2 border"} key={item}>

                                    <div className={"space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl"}>
                                        <p>
                                            {item?.sender?.fullName}
                                        </p>
                                        <p className={"text-gray-300"}>
                                            {item?.content}
                                        </p>
                                    </div>
                                    <Avatar>
                                        <AvatarFallback>
                                            {item?.sneder?.fullName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                        ))
                    }
                </ScrollArea>
                <div className={"relative p-0"}>
                    <Input
                        placeholder={"Type message ..."}
                        className={"py-7 rounded-lg outline-none focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0"}
                        value={message}
                        onChange={handleMessageChange}
                    />
                    <Button
                        onClick={handleSendMessage}
                        className={"absolute  right-2 top-3 rounded-full"}
                        size={"icon"}
                        variant={"ghost"}
                    >
                        <PaperPlaneIcon/>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
