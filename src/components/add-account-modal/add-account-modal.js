import React, { useEffect, useRef } from 'react';
import './add-account-modal.css';
import {useDispatch, useSelector} from 'react-redux';
import SummarySlice from '../../slices/summary-slice';


const AddAccountModal = (props) => {

    const dispatch = useDispatch();
    const summary = useSelector(state => state.summary);
    const inputRef = useRef();

    const onChangeHandler = (e) => {
        dispatch(SummarySlice.actions.setForm(e.target.value.toLowerCase()));
    }



    useEffect(()=> {
        document.body.classList.add('modal-open');
        if(inputRef.current) inputRef.current.focus();
        return ()=>{document.body.classList.remove('modal-open');}
    })
    
    return (
        <div id="add-account-modal">
            <div id="overlay"></div>

            <div id="main">
                <div id="form">
                    <div className="p-2">
                        <h5 className="text-white">Add Account</h5>
                    </div>
                    <div>
                        <input
                            name="username"
                            ref={inputRef}
                            value={summary.form.username}
                            onChange={onChangeHandler}
                            placeholder="ENTER HIVE USERNAME"
                            autoComplete="off"
                            onKeyUp={(e) => {
                                if(e.keyCode === 13) {
                                    dispatch(SummarySlice.actions.setForm(""));
                                    dispatch(SummarySlice.actions.showForm(false));
                                    props.fnAddAccount(summary.form.username);
                                }
                            }}/>
                        <div className="d-flex justify-content-end p-2">
                            <button className="btn-sm btn-danger m-1" onClick={()=>{
                                dispatch(SummarySlice.actions.showForm(false))
                            }}>Cancel</button>
                            <button className="btn-sm btn-success m-1" onClick={()=> {
                                dispatch(SummarySlice.actions.setForm(""));
                                dispatch(SummarySlice.actions.showForm(false));
                                props.fnAddAccount(summary.form.username);
                            }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}


export default AddAccountModal;