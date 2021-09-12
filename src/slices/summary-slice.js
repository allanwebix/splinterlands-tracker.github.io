import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    form        : {username: "", show: false},
    total       : {
        accounts: 0,
        dec: 0,
        sps: 0,
        s_sps: 0,
        dec_price: 0,
        sps_price: 0,
        con_dec_price : 0,
        con_sps_price : 0
    }
};

const SummarySlice = createSlice({
    name            : 'summary',
    initialState    : initialState,
    reducers        : {
        setForm(state, action){
            state.form.username = action.payload
        },
        showForm(state, action){
            state.form.show = action.payload
        },
        setTotal(state,action){
            state.total = action.payload
        }
    }
})

export default SummarySlice;