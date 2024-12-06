import {
    ASSIGNED_ISSUE_TO_USER_FAILURE,
    ASSIGNED_ISSUE_TO_USER_REQUEST, ASSIGNED_ISSUE_TO_USER_SUCCESS, CREATE_ISSUE_FAILURE,
    CREATE_ISSUE_REQUEST, CREATE_ISSUE_SUCCESS,
    DELETE_ISSUE_FAILURE,
    DELETE_ISSUE_REQUEST, DELETE_ISSUE_SUCCESS, FETCH_ISSUES_BY_ID_FAILURE,
    FETCH_ISSUES_BY_ID_REQUEST,
    FETCH_ISSUES_BY_ID_SUCCESS,
    FETCH_ISSUES_FAILURE,
    FETCH_ISSUES_REQUEST,
    FETCH_ISSUES_SUCCESS, UPDATE_ISSUE_FAILURE,
    UPDATE_ISSUE_REQUEST,
    UPDATE_ISSUE_STATUS_FAILURE,
    UPDATE_ISSUE_STATUS_REQUEST,
    UPDATE_ISSUE_STATUS_SUCCESS, UPDATE_ISSUE_SUCCESS
} from "@/redux/Issue/ActionType.js";
import api from "@/Api/api.js";
import {DELETE_COMMENT_SUCCESS} from "@/redux/Comment/ActionTypes.js";

export const fetchIssuesByProjectId=(projectId)=>async(dispatch)=>{
    dispatch({
        type:FETCH_ISSUES_REQUEST
    })
    try{
        const {data}=await api.get(`/api/issues/issue/project/${projectId}`)
        console.log("Fetched issues : ",data)
        dispatch({
            type:FETCH_ISSUES_SUCCESS,
            issues:data
        })
    }
    catch (e) {
        console.log(e)
        dispatch({
            type: FETCH_ISSUES_FAILURE,
            error:e
        })
    }
}

export const fetchIssuesById=(issueId)=>async(dispatch)=>{
    dispatch({
        type: FETCH_ISSUES_BY_ID_REQUEST
    })

    try{
        const {data}=await api.get(`/api/issues/issue/${issueId}`)
        console.log("Fetched issue : ",data)
        dispatch({
            type: FETCH_ISSUES_BY_ID_SUCCESS,
            issues:data
        })
    }

    catch (e){
        console.log(e)
        dispatch({
            type: FETCH_ISSUES_BY_ID_FAILURE,
            error:e
        })
    }
}

export const createIssue=(issueData)=>async (dispatch)=>{
    dispatch({
        type:CREATE_ISSUE_REQUEST
    })

    try{
        const {data}=await api.post(`/api/issues/create`,issueData)
        console.log("Created issue : ",data)
        dispatch({
            type: CREATE_ISSUE_SUCCESS,
            issues:data
        })
    }
    catch (e) {
        console.log(e)
        dispatch({
            type: CREATE_ISSUE_FAILURE,
            error:e
        })
    }
}


export const updateIssue=(issueId,updatedData)=>async (dispatch)=>{
    dispatch({
        type:UPDATE_ISSUE_REQUEST
    })

    try{
        const {data}=await api.put(`/api/issues/update/${issueId}`,updatedData)
        dispatch({
            type: UPDATE_ISSUE_SUCCESS,
            issues:data
        })
    }
    catch (e) {
        console.log(e)
        dispatch({
            type: UPDATE_ISSUE_FAILURE,
            error:e
        })
    }
}

export const deleteIssue=(issueId)=>async (dispatch)=>{
    dispatch({
        type:DELETE_ISSUE_REQUEST
    })

    try{
        await api.delete(`/api/issues/delete/${issueId}`)
        dispatch({
            type: DELETE_ISSUE_SUCCESS,
            issueId
        })
    }
    catch (e){
        console.log(e)
        dispatch({
            type: DELETE_ISSUE_FAILURE,
            error:e
        })
    }
}

export const updateIssueStatus=({issueId,status})=>async (dispatch)=>{
    dispatch({
        type:UPDATE_ISSUE_STATUS_REQUEST
    })
    try{
        const {data}=await api.put(`/api/issues/${issueId}/status/${status}`)
        console.log("updated data : " , data)
        dispatch({
            type: UPDATE_ISSUE_STATUS_SUCCESS,
            issues:data
        })
    }
    catch (e){
        console.log(e)
        dispatch({
            type: UPDATE_ISSUE_STATUS_FAILURE,
            error:e
        })
    }

}


export const assignedUserToIssue=({issueId,userId})=>async (dispatch)=>{
    dispatch({
        type: ASSIGNED_ISSUE_TO_USER_REQUEST
    })
    try{
        const {data}=await api.put(`/api/issues/${issueId}/assignee/${userId}`)
        console.log("Assigned Issue : " , data)
        dispatch({
            type: ASSIGNED_ISSUE_TO_USER_SUCCESS,
            issue:data
        })
    }
    catch (e){
        console.log(e)
        dispatch({
            type: ASSIGNED_ISSUE_TO_USER_FAILURE,
            error:e
        })
    }
}




















