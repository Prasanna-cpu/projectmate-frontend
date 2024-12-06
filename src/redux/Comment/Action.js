import {
    CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE, DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS, FETCH_COMMENTS_FAILURE, FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS
} from "@/redux/Comment/ActionTypes.js";
import api from "@/Api/api.js";


export const createComment=(commentData)=>async(dispatch)=>{
    dispatch({
        type:CREATE_COMMENT_REQUEST
    })
    try{
        const {data}=await api.post("/api/comments/create",commentData)

        console.log("Created comment : ",data)

        dispatch({
            type: CREATE_COMMENT_SUCCESS,
            comment:data
        })
    }
    catch (e) {
        console.log(e)
        dispatch({
            type: CREATE_COMMENT_FAILURE,
            payload: e,
        })
    }

}


export const deleteComment=(commentId)=>async(dispatch)=>{
    dispatch({
        type:DELETE_COMMENT_REQUEST
    })

    try{
        await api.delete(`/api/comments/delete/${commentId}`)
        console.log("Deleted comment : ",commentId)
        dispatch({
            type: DELETE_COMMENT_SUCCESS,
            commentId
        })
    }
    catch(error){
        console.log(error)
        dispatch({
            type: DELETE_COMMENT_FAILURE,
            payload: error,
        })
    }
}



export const fetchComments=(issueId)=>async (dispatch)=>{
    dispatch({
        type: FETCH_COMMENTS_REQUEST
    })

    try{
        const {data}=await api.get(`/api/comments/issuer/${issueId}`)
        console.log("Fetched comments : ",data)
        dispatch({
            type: FETCH_COMMENTS_SUCCESS,
            comments:data
        })
    }
    catch (e) {
        console.log(e)
        dispatch({
            type: FETCH_COMMENTS_FAILURE,
            payload: e,
        })
    }
}





























