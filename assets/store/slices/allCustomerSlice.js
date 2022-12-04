import {createSlice} from '@reduxjs/toolkit';

const allCustomerSlice = createSlice({
    name : 'custormer list',
    initialState:{
allCustormers : []
    },
    reducers: {
        addNewCustormer: (state, action) => {
            state.favoriteBooksList.push(action.payload.id)
            console.log('Book Added ', action.payload.id)
        }

    }
})