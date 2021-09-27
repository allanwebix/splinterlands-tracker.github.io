import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AccountSlice from '../../slices/account-slice';
import './account-list.css';
import SummarySlice from '../../slices/summary-slice'

const AccountList = (props) => {

    const dispatch = useDispatch();
    const summary = useSelector(state => state.summary);

    return (
        <div id="account-list" className="w-100" style={{backgroundColor: "#444"}}>
            <div id="account-list-header" className="d-flex justify-content-between p-2" style={{borderBottom: "1px solid #333"}}>
                <h5 className="text-white">Account List</h5>
                <div>
                    <button className="btn-sm btn-success m-1" onClick={()=>{
                        dispatch(SummarySlice.actions.showForm(true))
                    }}>ADD</button>
                    <button className="btn-sm btn-info m-1" onClick={props.fnRefresh}>REFRESH</button>
                    <button className="btn-sm btn-warning m-1">EXPORT</button>
                </div>

                
            </div>
            <div className="p-1 w-100" style={{overflow: 'auto'}}>
                <table className="table table-dark table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>ECR</th>
                            <th>Rank</th>
                            <th>Rating</th>
                            <th>Power</th>
                            <th>In-game DEC</th>
                            <th>SPS</th>
                            <th>Staked SPS</th>
                            <th>Credits</th>
                            <th>Untamed Packs</th>
                            <th>Quest Potion</th>
                            <th>Gold Potion</th>
                            <th>Legendary Potion</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.accounts.map((a, i) => (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{a.username}</td>
                                <td>{`${a.ecr}%`}</td>
                                <td>{a.rank}</td>
                                <td>{a.rating.toLocaleString()}</td>
                                <td>{a.power.toLocaleString()}</td>
                                <td>{a.dec.toLocaleString()}</td>
                                <td>{a.sps.toLocaleString()}</td>
                                <td>{a.s_sps.toLocaleString()}</td>
                                <td>{a.credits.toLocaleString()}</td>
                                <td>{a.untamed}</td>
                                <td>{a.quest_potion.toLocaleString()}</td>
                                <td>{a.gold_potion.toLocaleString()}</td>
                                <td>{a.legend_potion.toLocaleString()}</td>
                                <td><button className="btn-sm btn-danger" onClick={() => {
                                    dispatch(AccountSlice.actions.deleteAccount(a.username));

                                    //delete in localStorage
                                    let accountList = JSON.parse(localStorage.getItem('accounts'));
                                    let filtered = accountList.filter(acc => acc !== a.username);
                                    localStorage.setItem('accounts', JSON.stringify(filtered));
                                }}>DELETE</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AccountList;