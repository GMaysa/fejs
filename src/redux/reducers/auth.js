import { createSlice } from "@reduxjs/toolkit"

const initialState={
    token: localStorage.getItem("token") || null,
    isLoggedin: !!localStorage.getItem('token'),
    user: null,
}

const authSlicer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action)=> {
            (action.payload ?
            localStorage.setItem('token', action.payload):
            localStorage.removeItem('token'))
            state.token = action.payload 

        },
        setIsloggedin: (state, action)=>{
            state.isLoggedin = action.payload
        },
        setUser: (state, action)=>{
            state.user = action.payload
        }
    }
})

export const logout = (navigate) => async (dispatch) => {
    dispatch(setToken(null))
    dispatch(setIsloggedin(false))

    navigate('/')
}


export const { setIsloggedin, setToken, setUser } = authSlicer.actions

export default authSlicer.reducer