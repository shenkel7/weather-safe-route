import React, {useState} from 'react'
import './Button.css'
// import { useSelector, useDispatch } from 'react-redux'
// import { setType } from '../app/matchSlice'

const Buttons = () => {

    // const type = useSelector((state) => state.match.type);

    // const dispatch = useDispatch();

    // const changeType = (type) => {
    //     dispatch(setType(type));
    // }

       return (
            <div>
                <div><button className='button-design'>GO</button></div>
            </div>
        ) 
};

export default Buttons;