import Link from "next/link";
import React from "react";
import {Mutation} from 'react-apollo';
import styled from 'styled-components';
import {colors} from "../styles/global";
import {TOGGLE_CART_MUTATION} from '../Cart';
import NavStyles from '../styles/NavStyles';
import User from '../User';
import Signout from '../Signout';
import CartCount from "../CartCount";
import {
    MdClose,
    MdShoppingCart,
    MdArrowBack,
    MdArrowForward
} from 'react-icons/md';

const CartToggle = styled.button`
   background: ${colors.lightest};
  border: none;
  border-radius: 0;
  display: flex;
  justify-content: center;
  left: 0;
  padding: 0;
  position: relative;
  top: 0;
  
  svg {
    height: 28px;
    margin: 0;
    width: 28px;
  }
`;

const Nav = () => (
    <User>
        {({data: {me}}) => (
            <NavStyles>
                {me && (
                    <li>
                        <Mutation mutation={TOGGLE_CART_MUTATION}>
                            {(toggleCart) => (
                                <CartToggle onClick={toggleCart}>
                                    <MdShoppingCart/> <CartCount
                                    count={me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)}></CartCount>
                                </CartToggle>
                            )}
                        </Mutation>
                    </li>
                )}
            </NavStyles>
        )
        }
    </User>
);

export default Nav;