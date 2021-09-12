import React from 'react';
import API from '../api/api';


export const getDECPrice = async(curr) => {
    let dec_price = 0;
    await API.Price.getDECPrice(curr)
    .then(resp => {
        dec_price = resp["dark-energy-crystals"][`${curr.toLowerCase()}`];
        console.log(dec_price);
    })
    .catch(error => {
        console.error(error)
        alert('An error occured');
        return null;
    });

    return dec_price;
}

export const getSPSPrice = async(curr) => {

    let sps_price = 0;
    await API.Price.getSPSPrice(curr)
    .then(resp => {
        sps_price = resp["splinterlands"][`${curr.toLowerCase()}`];
    })
    .catch(err => {
        console.error(err)
        alert('An error occured');
        return null;
    });

    return sps_price;

}