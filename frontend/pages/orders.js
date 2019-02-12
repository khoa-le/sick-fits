import React from 'react';
import OrderList from '../components/OrderList'
import PleaseSignIn from '../components/PleaseSignin'

const OrdersPage = props => (
    <div>
        <PleaseSignIn>
            <OrderList/>
        </PleaseSignIn>
    </div>
);
export default OrdersPage