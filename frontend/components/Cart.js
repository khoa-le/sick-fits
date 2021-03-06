import React,{Component} from 'react';
import PropTypes  from 'prop-types';
import {Query, Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {adopt} from 'react-adopt'
import User from './User';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import {PrimaryButton} from './shared/Buttons';
import CartItem from './CartItem';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from "../lib/formatMoney";
import TakeMyMoney from './TakeMyMoney';

const LOCAL_STATE_QUERY = gql`
    query{
        cartOpen @client
    }
`;

const TOGGLE_CART_MUTATION = gql`
    mutation {
        toggleCart @client
    }
`;

const Composed = adopt({
    user: <User/>,
    toggleCart: <Mutation mutation={TOGGLE_CART_MUTATION}></Mutation>,
    localState: <Query query={LOCAL_STATE_QUERY}/>
});

class Cart extends Component{
    static propTypes = {
        user: PropTypes.object
    }
    render(){
        return (
            <Composed>
                {({user, toggleCart, localState}) => {
                    const me = user.data.me;
                    if (!me) return null;
                    return (
                        <CartStyles open={localState.data.cartOpen}>
                            <header>
                                <CloseButton onClick={toggleCart} title='close'>&times;</CloseButton>
                                <p>Bạn có {me.cart.length} món hàng trong giỏ.</p>
                            </header>
                            <ul>
                                {me.cart.map(cartItem => <CartItem key={cartItem.id}
                                                                   cartItem={cartItem}>{cartItem.id}</CartItem>)}
                            </ul>
                            <footer>
                                <p>{formatMoney(calcTotalPrice(me.cart))}</p>
                                {me.cart.length>0 && (
                                    <TakeMyMoney>
                                        <PrimaryButton>Thanh Toán</PrimaryButton>
                                    </TakeMyMoney>
                                )}
                            </footer>
                        </CartStyles>
                    )
                }}
            </Composed>
        );
    }
};

export default Cart;
export {LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION};
