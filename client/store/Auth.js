import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    access_token: null,
    user: {},
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        hydrate:(state, action) => {
            return action.payload
        },
        login: (state, action) => {
            state.user = action.payload.user;
            state.access_token = action.payload.access_token;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.user = null
            state.access_token = null;
            state.isLoggedIn = false;
        }
    }
});

export const authActions = authSlice.actions

export default authSlice;