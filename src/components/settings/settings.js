import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Currencies from '../../common/currencies';
import UISlice from '../../slices/ui-slice';
import {getDECPrice, getSPSPrice} from '../../helper/price';
import './settings.css'
import SummarySlice from '../../slices/summary-slice';

const Settings = () => {

    const dispatch = useDispatch();
    const ui = useSelector(state => state.ui);
    const summary = useSelector(state => state.summary);
    const [currency, setCurrency] = useState(ui.currency);
    const [darkTheme, setDarkTheme] = useState(ui.darkTheme);

    const hideSettings = () => {
        dispatch(UISlice.actions.isShowSettings(false));
    }

    const onCurrencyChangeHandler = (e) => {
        setCurrency(e.target.value);
    }

    const saveSettings = async() => {
        dispatch(UISlice.actions.setCurrency(currency));
        dispatch(UISlice.actions.setTheme(darkTheme))
        dispatch(UISlice.actions.isShowSettings(false));

        //save settings to localStorage
        const settings = {currency : currency, darkTheme : darkTheme}
        localStorage.setItem('settings', JSON.stringify(settings));

        //update prices

        let dec_price = await getDECPrice('USD');
        let sps_price = await getSPSPrice('USD');

        let con_dec_price = await getDECPrice(settings.currency);
        let con_sps_price = await getSPSPrice(settings.currency);

        dispatch(SummarySlice.actions.setTotal({
            ...summary.total,
            dec_price : dec_price,
            sps_price : sps_price,
            con_dec_price : con_dec_price,
            con_sps_price : con_sps_price
        }));

    }

    useEffect(()=> {
        document.body.classList.add('modal-open');
        return ()=>{document.body.classList.remove('modal-open');}
    })

    return (
        <div id="settings">
            <div id="overlay"></div>
            <div id="main">
                <div id="form">
                    <div className="p-2"><h5>Settings</h5></div>
                    <div className='p-2 form-group'>
                        <label htmlFor="currency">Currency</label>
                        <select className='form-control' id="currency" name="currency" value={currency}
                        onChange={onCurrencyChangeHandler}>
                            {Currencies.map((c, i) => {
                                return <option value={c} key={i}>{c}</option>
                            })}
                        </select>
                    </div>
                    <div className='p-2'>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={darkTheme} onChange={(e)=> setDarkTheme(e.target.checked)}/>
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable Dark Mode</label>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-danger btn-sm m-1" onClick={hideSettings}>Cancel</button>
                        <button className="btn btn-success btn-sm m-1" onClick={saveSettings}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;

