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
        pageLoading: (state, action) => {
            state.isLoading = action.payload;
        },
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
            state.isLoading = false;
            state.success = action.payload.success
        }
    }
})

export const { pageLoading, getArtisanData, getAgentArtisanSuccess, getArtisanFailure } = artisanSlice.actions

export default artisanSlice.reducer