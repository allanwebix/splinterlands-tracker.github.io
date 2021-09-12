import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading : false,
    darkTheme : true,
    currency  : 'PHP',
    isShowSettings : false,
}
const UISlice =  createSlice({
    name: 'ui',
    initialState :initialState,
    reducers : {
        isLoading(state, action) {
            state.isLoading = action.payload
        },
        setTheme(state, action) {
            state.darkTheme = action.payload
        },
        setCurrency(state, action) {
            state.currency = action.payload;
        },
        isShowSettings(state, action){
            state.isShowSettings = action.payload;
        }
    }
})

export default UISlice;