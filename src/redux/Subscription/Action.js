import {
    GET_USER_SUBSCRIPTION_FAILURE,
    GET_USER_SUBSCRIPTION_REQUEST,
    GET_USER_SUBSCRIPTION_SUCCESS,
    UPGRADE_SUBSCRIPTION_FAILURE,
    UPGRADE_SUBSCRIPTION_REQUEST,
    UPGRADE_SUBSCRIPTION_SUCCESS
} from "@/redux/Subscription/ActionTypes.js";
import api from "@/Api/api.js";

export const getUserSubscription=(jwt)=>async (dispatch)=>{
    dispatch({
        type:GET_USER_SUBSCRIPTION_REQUEST
    })

    try{
        const {data}=await api.get(`/api/subscriptions/user-subscriptions`,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        console.log("Subscription : ",data)
        dispatch({
            type: GET_USER_SUBSCRIPTION_SUCCESS,
            payload:data
        })
    }
    catch (e) {
        console.log(e)
        dispatch({
            type: GET_USER_SUBSCRIPTION_FAILURE,
            error: e
        })
    }
}



export const upgradeSubscription=({planType})=>async (dispatch)=>{
    dispatch({
        type:UPGRADE_SUBSCRIPTION_REQUEST
    })


    try{
        const response = await api.patch("/api/subscriptions/upgrade", null, {
            params: {
                planType: encodeURIComponent(planType),
            },
        });
        dispatch({
            type: UPGRADE_SUBSCRIPTION_SUCCESS,
            payload: response.data
        });
        console.log("upgraded subscription",response.data);
    }
    catch (e){
        console.log(e)
        dispatch({
            type: UPGRADE_SUBSCRIPTION_FAILURE,
            error: e
        })
    }
}



















