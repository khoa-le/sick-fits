import React from 'react';
import formatMoney from '../lib/formatMoney';
import styled from 'styled-components';
import RemoveFromCart from "./RemoveFromCart";

const CartItemStyles = styled.li`
    padding: 1rem 0;
    border-bottom: 1px solid ${props => props.theme.lightGrey};
    display:grid;
    align-item: center;
    grid-template-columns: auto 1fr auto;
    img{
      margin-right:10px;
    }
    h3, p{
      margin:0;
    }

`;

const CarItem = ({cartItem}) => {
    if (!cartItem.item) return <p>This item has beedn removed! <RemoveFromCart id={cartItem.id}/></p>;
    return (
        <CartItemStyles>
            <img width='100' src={cartItem.item.image} alt={cartItem.item.title}/>
            <div className="cart-item-details">
                <h3>{cartItem.item.title}</h3>
                <p>
                    {formatMoney(cartItem.item.price * cartItem.quantity)}
                    {' - '}
                    {cartItem.quantity} &times; {formatMoney(cartItem.item.price)}
                </p>
            </div>
            <RemoveFromCart id={cartItem.id}/>
        </CartItemStyles>
    );
};

export default CarItem;