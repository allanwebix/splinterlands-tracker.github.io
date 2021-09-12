import React, {useEffect} from 'react';
import './loading.css';


const Loading = () => {

    useEffect(()=> {
        document.body.classList.add('modal-open');
        return ()=>{document.body.classList.remove('modal-open');}
    })

    return (
        <div id="loading">

            <div id="loading-container">
                <img src={process.env.PUBLIC_URL + '/img/loading.svg'} height="100"/>
            </div>
        </div>
    )
}

export default Loading;