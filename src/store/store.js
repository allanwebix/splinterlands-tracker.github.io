import {configureStore} from '@reduxjs/toolkit';
import AccountSlice from '../slices/account-slice';
import SummarySlice from '../slices/summary-slice';
import UISlice from '../slices/ui-slice';

const store = configureStore({
    reducer : {
        accounts    : AccountSlice.reducer,
        ui          : UISlice.reducer,
        summary     : SummarySlice.reducer
    }
});

export default store;