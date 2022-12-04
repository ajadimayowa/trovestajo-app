import { createSlice } from "@reduxjs/toolkit";

const artisanSlice = createSlice({
    name: 'artisans',
    initialState: {
        artisans: [],
        success: '',
        isLoading: false,
        token: ''
    },
    reducers: {
        getArtisanData: (state, action) => {
            state.isLoading = true;
            state.token = action.payload
        },
        getAgentArtisanSuccess: (state, action) => {
            const { data, success, isLoading } = action.payload
            state.artisans = data;
            state.success = success
            state.isLoading = isLoading;
        },
        getArtisanFailure: (state) => {
            state.isLoading = action.payload.isLoading;
            state.success = action.payload.success
        }
    }
})

export const { getArtisanData, getAgentArtisanSuccess, getArtisanFailure } = artisanSlice.actions

export default artisanSlice.reducer