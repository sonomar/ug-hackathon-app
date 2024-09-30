import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {user: null, token: null},
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        clearCredentials: (state, action) => {
            state.user = null;
            state.token = null;
        }
    }
});

export const {setCredentials, clearCredentials} = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (state)=> state.auth;