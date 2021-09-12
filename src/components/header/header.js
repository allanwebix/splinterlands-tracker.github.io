import React from 'react';
import {useDispatch} from 'react-redux';
import './header.css';
import UISlice from '../../slices/ui-slice'
import {useHistory} from 'react-router-dom';


const Header = () => {

    const dispatch = useDispatch();

    const history = useHistory();

    const showSettings = () => {
        dispatch(UISlice.actions.isShowSettings(true));
    }
    return (
        <div id="header">
            <span>SPLINTERLAND TRACKER |</span>

            <div id="links">
                <span className="link" onClick={()=> history.push('/dashboard')}>DASHBOARD</span>
                <span className="link" onClick={()=> history.push('/cards')}>CARDS</span>
                <span className="link" onClick={()=> history.push('/rented-cards')}>RENTED CARDS</span>
                <span className="link" onClick={showSettings}>SETTINGS</span>
            </div>
        </div>
    )
}

export default Header;