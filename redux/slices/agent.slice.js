import { createSlice } from "@reduxjs/toolkit";

const agentSlice = createSlice({
    name: 'agent',
    initialState: {
        agentData: {},
        isLoading: false,
        success: false,
        token: ''
    },
    reducers: {
        getAgentData: (state) => {
            state.isLoading = true;
        },
        getAgentSuccess: (state, action) => {
            state.isLoading = false;
            state.agentData = action.payload.data;
            state.success = action.payload.success;
            state.token = action.payload.token
        },
        getAgentFailure: (state) => {
            state.isLoading = false;
        },
        logOutAgent: (state) => {
            state.isLoading = false;
            state.agentData = {};
            state.success = false;
            state.token = ''
        }
    }
})

export const { getAgentData, getAgentSuccess, getAgentFailure,logOutAgent } = agentSlice.actions

export default agentSlice.reducer