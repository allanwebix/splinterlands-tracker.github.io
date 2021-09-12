import {createSlice} from '@reduxjs/toolkit';


const initialState = [];

const AccountSlice = createSlice({
    name            : 'accounts',
    initialState    : initialState,
    reducers       : {
        addAccount(state, action){
            state.push(action.payload);
        },
        deleteAccount(state, action){
            let filtered = state.filter(a => a.username !== action.payload)
            return filtered
        },
        setAccounts(state, action){
            return action.payload;
        }
    }
});

export default AccountSlice;