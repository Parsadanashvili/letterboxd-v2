import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    sidebarIsOpen: false,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarIsOpen = !state.sidebarIsOpen;
        },
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;