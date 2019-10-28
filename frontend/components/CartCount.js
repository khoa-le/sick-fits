import React from 'react';
import styled from 'styled-components';
import {colors, spacing} from "./styles/global";

const ItemsNumber = styled.span`
  align-items: center;
  background: ${colors.accent};
  border-radius: 50%;
  color: ${colors.brandDark};
  display: flex;
  font-size: 1.3rem;
  font-weight: bold;
  height: 36px;
  justify-content: center;
  width: 36px;
   position: absolute;
    right: ${spacing['3xs']}px;
    top: ${spacing['3xs']}px;
    transform: scale(0.6);
`;


const CartCount = ({count}) => (
    <ItemsNumber>{count}</ItemsNumber>
);

export default CartCount;