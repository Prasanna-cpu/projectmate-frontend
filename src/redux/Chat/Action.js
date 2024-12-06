import {
    FETCH_CHAT_BY_PROJECT_FAILURE,
    FETCH_CHAT_BY_PROJECT_REQUEST,
    FETCH_CHAT_BY_PROJECT_SUCCESS,
    FETCH_CHAT_MESSAGES_REQUEST,
    FETCH_CHAT_MESSAGES_SUCCESS,
    SEND_MESSAGE_FAILURE,
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS
} from "@/redux/Chat/ActionTypes.js";
import api from "@/Api/api.js";

export const sendMessage=(messageData)=>async(dispatch)=>{
    dispatch({
        type:SEND_MESSAGE_REQUEST
    })


    try{
        const {data}=await api.post("api/messages/send",messageData)
        console.log("Message sent : ",data)
        dispatch({
            type:SEND_MESSAGE_SUCCESS,
            message:data
        })
    }
    catch(error){
        console.log(error)
        // Handle error here
        dispatch({
            type:SEND_MESSAGE_FAILURE,
            error:error
        })
    }

}


export const fetchChatByProjectId=(projectId)=>async(dispatch)=>{
    dispatch({
        type:FETCH_CHAT_BY_PROJECT_REQUEST
    })
    try{
        const {data}=await api.get(`/api/projects/${projectId}/get-chat`)
        console.log("Chat fetched : ",data)
        dispatch({
            type: FETCH_CHAT_BY_PROJECT_SUCCESS,
            chat:data
        })
    }
    catch(error){
        console.log(error)
        dispatch({
            type: FETCH_CHAT_BY_PROJECT_FAILURE,
            error: error
        })
    }
}

export const fetchChatMessages=(chatId)=>async (dispatch)=>{
    dispatch({
        type: FETCH_CHAT_MESSAGES_REQUEST
    })
    try{
        const {data}=await api.get(`/api/messages/chat/${chatId}`)
        console.log("Chat messages fetched : ",data)
        dispatch({
            type: FETCH_CHAT_MESSAGES_SUCCESS,
            chatId,
            messages:data
        })
    }
    catch(error){
        console.log(error)
        dispatch({
            type: FETCH_CHAT_BY_PROJECT_FAILURE,
            error: error
        })
    }
}
















