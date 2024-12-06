import api from "@/Api/api.js";
import {
    ACCEPT_INVITATION_FAILURE,
    ACCEPT_INVITATION_REQUEST,
    ACCEPT_INVITATION_SUCCESS, CREATE_PROJECT_FAILURE,
    CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAILURE,
    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_SUCCESS,
    FETCH_PROJECT_BY_Id_FAILURE,
    FETCH_PROJECT_BY_Id_REQUEST,
    FETCH_PROJECT_BY_Id_SUCCESS,
    FETCH_PROJECTS_FAILURE,
    FETCH_PROJECTS_REQUEST,
    FETCH_PROJECTS_SUCCESS,
    INVITE_TO_PROJECT_FAILURE,
    INVITE_TO_PROJECT_REQUEST,
    INVITE_TO_PROJECT_SUCCESS,
    SEARCH_PROJECT_FAILURE,
    SEARCH_PROJECT_REQUEST,
    SEARCH_PROJECT_SUCCESS, UPDATE_PROJECT_FAILURE,
    UPDATE_PROJECT_REQUEST,
    UPDATE_PROJECT_SUCCESS
} from "@/redux/Project/ActionTypes.js";

export const fetchProjects=({
    category,tag
})=>async(dispatch)=>{
    dispatch({
        type:FETCH_PROJECTS_REQUEST
    })


    const params = {};
    if (category) {
        params.category = category;
    }
    if (tag) {
        params.tag = tag;
    }



    try{
        const {data}=await api.get("/api/projects/get-projects",{
            params
        })
        console.log("All Projects Listed : ",data)
        dispatch({
            type: FETCH_PROJECTS_SUCCESS,
            projects:data
        })

    }
    catch(err){
        console.log(err)
        dispatch({
            type:FETCH_PROJECTS_FAILURE,
            payload:err
        })
    }

}


export const searchProjects=(keyword)=>async (dispatch)=>{
    dispatch({
        type:SEARCH_PROJECT_REQUEST
    })

    try{
        const {data}=await api.get(`/api/projects/search?keyword=${keyword}`)
        console.log("Search Projects Listed : ",data)
        dispatch({
            type: SEARCH_PROJECT_SUCCESS,
            projects:data
        })
    }
    catch(err){
        console.log(err)
        // dispatch error action
        dispatch({
            type: SEARCH_PROJECT_FAILURE,
            error: err
        })
    }
}

export const createProject=(projectData)=>async (dispatch)=>{
    dispatch({
        type:CREATE_PROJECT_REQUEST
    })

    try{
        const {data}=await api.post("/api/projects/create",projectData)
        console.log("Project Created : ",data)
        dispatch({
            type: CREATE_PROJECT_SUCCESS,
            project:data
        })
    }
    catch(err){
        console.log(err)
        dispatch({
            type: CREATE_PROJECT_FAILURE,
            error: err
        })
    }
}

export const updateProject=({updatedData,projectId})=>async (dispatch)=>{
    dispatch({
        type:UPDATE_PROJECT_REQUEST
    })

    try{
        const {data}=await api.put(`/api/projects/update/${projectId}`,updatedData)
        console.log("Updated Projects :",data)
        dispatch({
            type: UPDATE_PROJECT_SUCCESS,
            project:data
        })
    }
    catch (e) {
        console.log(e)
        dispatch({
            type: UPDATE_PROJECT_FAILURE,
            error: e
        })
    }
}

export const deleteProject=({projectId})=>async(dispatch)=>{
    dispatch({
        type: DELETE_PROJECT_REQUEST
    })

    try {
        await api.delete(`/api/projects/delete/${projectId}`)
        console.log("Project Deleted : ",projectId)
        dispatch({
            type:DELETE_PROJECT_SUCCESS,
            projectId
        })
    }
    catch (e) {
        console.log(e)
        dispatch({
            type: DELETE_PROJECT_FAILURE,
            error: e
        })
    }
}

export const fetchProjectById=(id)=>async(dispatch)=>{
    dispatch({
        type: FETCH_PROJECT_BY_Id_REQUEST
    })

    try {
        const {data}=await api.get(`/api/projects/get-project/${id}`)
        console.log("Project Details :",data)
        dispatch({
            type: FETCH_PROJECT_BY_Id_SUCCESS,
            projectDetails:data
        })
    }
    catch (e) {
        console.log(e)
        dispatch({
            type: FETCH_PROJECT_BY_Id_FAILURE,
            error: e
        })
    }
}

export const inviteToProjectById=({email,projectId})=>async(dispatch)=>{
    dispatch({
        type:INVITE_TO_PROJECT_REQUEST
    })

    try{
        const {data}=await api.post("/api/projects/invite",{email:email,projectId:projectId})
        console.log("Project Invitation Success :",data)
        dispatch({
            type:INVITE_TO_PROJECT_SUCCESS
        })
    }
    catch(e){
        console.log(e)
        dispatch({
            type: INVITE_TO_PROJECT_FAILURE,
            error: e
        })
    }
}

export const acceptInvitation=({token,navigate})=>async (dispatch)=>{

    dispatch({
        type:ACCEPT_INVITATION_REQUEST
    })

    try{
        const {data}=await api.get(`/api/projects/accept`,{
            params:{token}
        })
        console.log("Data received for invitation : ",data)
        console.log("project id :",data?.data?.projectId)
        if(data?.data?.projectId){
            navigate(`/project/${data?.data?.projectId}`)
            console.log("accept invitation",data)
            dispatch({ type: ACCEPT_INVITATION_SUCCESS,payload:data });
        }
        else{
            console.log("No project found with this token")
            dispatch({ type: ACCEPT_INVITATION_FAILURE, payload: {error: "No project found with this token"} });
        }

    }
    catch (e) {
        console.log(e)
        dispatch({
            type: ACCEPT_INVITATION_FAILURE,
            error: e
        })
    }
}













