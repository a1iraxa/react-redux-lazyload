import React from 'react';
import { increment, decrement } from "../actions";
import AddNinja from './AddNinja';
import { useSelector, useDispatch } from "react-redux";

const Practice = () => {

    const counter = useSelector(state => state.counter);
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();


    return (
        <div>
            <div className="container">
                <h4 className="center">Practice</h4>
                <h2>Counter: {counter}</h2>
                <button onClick={() => dispatch(increment(5))}>Increment by 5</button>
                <button onClick={() => dispatch(decrement())}>Decrement by 1</button>

                {!isLogged ? (<h3>Show only logged in users!</h3>) : ''}
                <AddNinja />

            </div>
        </div>
    );
};

export default Practice;
