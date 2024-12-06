import {
    GET_USER_FAILURE,
    GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from "@/redux/Auth/ActionTypes.js";
import api from "@/Api/api.js";

export const register=(userData)=>async(dispatch)=>{
    dispatch({
        type:REGISTER_REQUEST
    })


    try{
        const response=await api.post("/auth/signup",userData)

        const user = response.data;
        console.log("User:",user)
        if(user.jwt) localStorage.setItem('jwt',user.jwt)
        console.log("register success:- ",user)

            dispatch({
                type: REGISTER_SUCCESS,
                payload:user
            })

    }
    catch(err){
        console.log(err)
        dispatch({
            type: REGISTER_FAILURE,
            error:err
        })
    }
}

export const login=(userData)=>async(dispatch)=>{
    dispatch({
        type:LOGIN_REQUEST
    })


    try{
        const {data}=await api.post("/auth/signin",userData)
        if(data.jwt){
            localStorage.setItem("jwt",data.jwt)
            dispatch({
                type: LOGIN_SUCCESS,
                payload:data
            })
        }
        console.log("Login successful")
    }
    catch(err){
        console.log(err)
        dispatch({
            type: LOGIN_FAILURE,
            error:err
        })
    }
}


// getUser action in your Redux action file
export const getUser = (jwt) => async (dispatch, getState) => {
    const { auth } = getState(); // Access current auth state

    // Check if user data already exists, if so, don't fetch again
    if (auth.user) {
        console.log("User already fetched:", auth.user);
        return; // Exit if user data is already present
    }

    dispatch({
        type: GET_USER_REQUEST  // Indicate loading state
    });

    try {
        // API call to fetch user data
        const { data } = await api.get("/api/users/profile", {
            headers: {
                Authorization: `Bearer ${jwt}`  // Use JWT token for authentication
            }
        });

        // Dispatch success action with the retrieved user data
        dispatch({
            type: GET_USER_SUCCESS,
            payload:data
        });

        console.log("User retrieval success:", data);
    } catch (err) {
        console.log(err);
        // Dispatch failure action in case of an error
        dispatch({
            type: GET_USER_FAILURE,
            error: err  // Include the error in the action payload
        });
    }
};


export const logout=()=>{
    return async (dispatch)=>{
        dispatch({
            type: LOGOUT
        })
        localStorage.clear()
        console.log("User successfully logged out")
    }
}