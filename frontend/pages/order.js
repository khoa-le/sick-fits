import React from 'react';
import Order from '../components/Order'
import PleaseSignIn from '../components/PleaseSignin'

const OrderPage = props => (
    <div>
        <PleaseSignIn>
            <Order id={props.query.id}></Order>
        </PleaseSignIn>
    </div>
);
export default OrderPage