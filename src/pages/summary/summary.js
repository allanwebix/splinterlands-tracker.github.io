import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './summary.css';
import Card from '../../components/card/card';
import API from '../../api/api';
import AccountList from '../../components/account-list/account-list';
import AccountSlice from '../../slices/account-slice';
import UISlice from '../../slices/ui-slice';
import AddAccountModal from '../../components/add-account-modal/add-account-modal';
import SummarySlice from '../../slices/summary-slice';
import {getDECPrice, getSPSPrice} from '../../helper/price';


const Summary = () => {

    const dispatch = useDispatch();
    const accounts = useSelector((state)=> state.accounts);
    const ui = useSelector((state) => state.ui);
    const summary = useSelector((state) => state.summary);

    const getAccountDetails = async(username) => {
        let dec = 0;
        let sps = 0;
        let s_sps = 0;
        let quest_potion = 0;
        let gold_potion = 0;
        let legend_potion = 0;
        let ecr = 0;
        let untamed = 0;
        let credits = 0;
        let rating = 0;
        let power = 0;
        let rank = "";
        let user_exist = false;


        await API.Splinterlands.getPlayerBalance(username)
        .then(resp => {
            if (resp.length > 0)
            {
                user_exist = true;

                resp.forEach((account) => {
                    if(account.token === "DEC") dec = account.balance
                    else if (account.token === "SPS") sps = account.balance
                    else if (account.token === "SPSP") s_sps = account.balance
                    else if (account.token === "ECR") ecr = account.balance
                    else if (account.token === "QUEST") quest_potion = account.balance
                    else if (account.token === "GOLD") gold_potion = account.balance
                    else if (account.token === "LEGENDARY") legend_potion = account.balance
                    else if (account.token === "UNTAMED") untamed = account.balance
                    else if (account.token === "CREDITS") credits = account.balance
                })

            }
            else
            {
                alert("user does not exist");
                return;
            }
        })
        .catch(err => {
            console.error(err);
            dispatch(UISlice.actions.isLoading(false));
            alert('An error occured');
            return null;
        });

        await API.Splinterlands.getPlayerSettings(username)
        .then(resp => {
            power = resp.collection_power;
            rating = resp.season_details.rating
           
            const league = [
                {id: 0, name: 'Novice'},
                {id: 1, name: 'Bronze III'},
                {id: 2, name: 'Bronze II'},
                {id: 3, name: 'Bronze I'},
                {id: 4, name: 'Silver III'},
                {id: 5, name: 'Silver II'},
                {id: 6, name: 'Silver I'},
                {id: 7, name: 'Gold III'},
                {id: 8, name: 'Gold II'},
                {id: 9, name: 'Gold I'},
                {id: 10, name: 'Diamond III'},
                {id: 11, name: 'Diamond II'},
                {id: 12, name: 'Diamond I'},
                {id: 13, name: 'Champion III'},
                {id: 14, name: 'Champion II'},
                {id: 15, name: 'Champion I'},
            ]

            const curLeague = league.filter(l => l.id === resp.league);
            
            rank = curLeague[0].name;

        })
        .catch(err => {
            console.error(err);
            dispatch(UISlice.actions.isLoading(false));
            alert('An error occured');
        })

        return {
            username        : username,
            credits         : credits,
            dec             : dec,
            sps             : sps,
            s_sps           : s_sps,
            untamed         : untamed,
            ecr             : ecr / 100,
            quest_potion    : quest_potion,
            gold_potion     : gold_potion,
            legend_potion   : legend_potion,
            power           : power,
            rating          : rating,
            rank            : rank
        }
    }

    const addAccount = async (username) => {

        dispatch(UISlice.actions.isLoading(true));
        

        const account = await getAccountDetails(username);

        if (account)
        {
            dispatch(AccountSlice.actions.addAccount(account));

            let accountList = JSON.parse((localStorage.getItem('accounts')));

            accountList.push(account.username);

            localStorage.setItem('accounts', JSON.stringify(accountList));
        }

        dispatch(UISlice.actions.isLoading(false));
        return;

    }

    const getAllAccounts = async(accounts) => {
        let accountsArr = [];
        for(const account of accounts)
        {
            const details = await getAccountDetails(account);
            accountsArr.push(details);
        }

        return accountsArr;
    }

    const refresh = async() => {
        const accountList = JSON.parse(localStorage.getItem('accounts'));
        dispatch(UISlice.actions.isLoading(true));
        await getAllAccounts(accountList)
        .then(res => {
            dispatch(AccountSlice.actions.setAccounts(res));
        });
        dispatch(UISlice.actions.isLoading(false));
    }


    useEffect(()=> {
        const init = async () => {
            //get stored settings
            const settings = JSON.parse(localStorage.getItem('settings'));
            if (settings)
            {
                dispatch(UISlice.actions.setCurrency(settings.currency));
                dispatch(UISlice.actions.setTheme(settings.darkTheme));
            }
            //

            //check prices

            let dec_price = await getDECPrice('USD');
            let sps_price = await getSPSPrice('USD');

            let con_dec_price = await getDECPrice(settings.currency);
            let con_sps_price = await getSPSPrice(settings.currency);

            console.log(settings.currency);
            console.log(con_dec_price);

            dispatch(SummarySlice.actions.setTotal({
                ...summary.total,
                dec_price : dec_price,
                sps_price : sps_price,
                con_dec_price: con_dec_price,
                con_sps_price : con_sps_price
            }))

            let accountsList = JSON.parse(localStorage.getItem('accounts'));

            if(accountsList) //retrieve details 
            {
                dispatch(UISlice.actions.isLoading(true));
                await getAllAccounts(accountsList)
                .then(res => {
                    dispatch(AccountSlice.actions.setAccounts(res));
                });
                dispatch(UISlice.actions.isLoading(false));
            }
            else // set accounts in localStorage
            {
                localStorage.setItem('accounts', '[]')
            }
        }

        init();

        //set timer to update every 5 mins
        setInterval(async ()=>{
            const settings = JSON.parse(localStorage.getItem('settings'));
            //update dec and sps price
            const dec_price = await getDECPrice('USD');
            const sps_price = await getSPSPrice('USD');
            let con_dec_price = await getDECPrice(settings.currency);
            let con_sps_price = await getSPSPrice(settings.currency);

            dispatch(SummarySlice.actions.setTotal({
                ...summary.total,
                dec_price : dec_price,
                sps_price : sps_price,
                con_dec_price : con_dec_price,
                con_sps_price : con_sps_price
            }));

            

        }, 20000)
    }, []);



    //calculate total
    let total_accounts = 0;
    let total_dec = 0;
    let total_sps = 0;
    let total_ssps = 0;
    let total_con_dec = 0;
    let total_con_sps = 0;
    let total_con_ssps = 0;

    accounts.forEach(a => {
        total_accounts ++;
        total_dec += a.dec;
        total_sps += a.sps;
        total_ssps += a.s_sps
    })

    total_con_dec = total_dec * summary.total.con_dec_price;
    total_con_sps = total_sps * summary.total.con_sps_price;
    total_con_ssps = total_ssps * summary.total.con_sps_price;

    return (
        <div id="summary" className="p-3 container container-lg">
            {(summary.form.show) ? <AddAccountModal fnAddAccount={addAccount}/> : ''}
            <div id="tiles-container" className="row">
                <div className="tile col-md-4 p-2">
                    <Card className="text-white" header="TOTAL ACCOUNT" headerclass="text-center" style={{backgroundColor: "#444"}}>
                        <div className="text-center">
                            <span className="total_account">{total_accounts}</span>
                        </div>
                    </Card>
                </div>
                <div className="tile col-md-4 p-2">
                    <Card className="text-white" header="TOTAL IN-GAME DEC" headerclass="text-center" style={{backgroundColor: "#444"}}>
                        <div className="text-center">
                            <span >{total_dec.toLocaleString()}</span>
                            <div className="price_conv"><span>{`(${ui.currency} ${total_con_dec.toLocaleString()})`}</span></div>
                        </div>
                    </Card>
                </div>
                <div className="tile col-md-4 p-2">
                    <Card className="text-white" header="TOTAL SPS" headerclass="text-center" style={{backgroundColor: "#444"}}>
                        <div className="text-center">
                            <span >{total_sps.toLocaleString()}</span>
                            <div className="price_conv"><span>{`(${ui.currency} ${total_con_sps.toLocaleString()})`}</span></div>
                        </div>
                    </Card>
                </div>
                <div className="tile col-md-4 p-2">
                    <Card className="text-white" header="TOTAL STAKED SPS" headerclass="text-center" style={{backgroundColor: "#444"}}>
                        <div className="text-center">
                            <span >{total_ssps.toLocaleString()}</span>
                            <div className="price_conv"><span>{`(${ui.currency} ${total_con_ssps.toLocaleString()})`}</span></div>
                        </div>
                    </Card>
                </div>
                <div className="tile col-md-4 p-2">
                    <Card className="text-white" header="CURRENT DEC PRICE" headerclass="text-center" style={{backgroundColor: "#444"}}>
                        <div className="text-center">
                            <span >{`$${summary.total.dec_price}`}</span>
                            <div className="price_conv"><span>{`(${ui.currency} ${summary.total.con_dec_price})`}</span></div>
                        </div>
                    </Card>
                </div>
                <div className="tile col-md-4 p-2">
                    <Card className="text-white" header="CURRENT SPS PRICE" headerclass="text-center" style={{backgroundColor: "#444"}}>
                        <div className="text-center">
                            <span >{`$${summary.total.sps_price}`}</span>
                            <div className="price_conv"><span>{`(${ui.currency} ${summary.total.con_sps_price})`}</span></div>
                        </div>
                    </Card>
                </div>
                
            </div>

            <div className="row p-2">
                <AccountList accounts={accounts} fnRefresh={refresh}/>
            </div>
            
        </div>
    )
}

export default Summary;