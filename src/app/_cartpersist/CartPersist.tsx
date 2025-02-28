import React from 'react'
import {useEffect} from 'react';

export const CartPersist = (cartState:any) => {
    useEffect(() => {
        if(cartState.length > 0){
            localStorage.setItem("Cart", JSON.stringify(cartState));
        }
    }, [cartState]);

    return cartState;
}
