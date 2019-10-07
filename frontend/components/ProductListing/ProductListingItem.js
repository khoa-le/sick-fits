import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import {spacing, colors, radius, fonts} from "../styles/global";
import {MdShoppingCart, MdArrowForward} from 'react-icons/md';
import ItemStyles from '../styles/ItemStyles';
import PriceTag from '../styles/PriceTag';
import formatMoney from '../../lib/formatMoney';
import ProductListingHeader from "./ProductListingHeader";

const TRANSITION_DURATION = '250ms';

const Name = styled.h3`
  color: ${colors.brandDark};
  font-family: ${fonts.heading};
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
`;

const PriceRow = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  margin-top: ${spacing.xs}px;
`;

const Incentive = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.4rem;
  line-height: 1.3;
  margin-bottom: ${spacing['2xs']}px;
  text-align: right;
  transition: all ${TRANSITION_DURATION};

  > a {
      color: ${colors.brand};
    > svg {
      display: inline;
      margin-right: -${spacing['3xs']}px;
      vertical-align: middle;
    }
  }
`;

const CartIcon = styled.span`
  align-items: center;
  background: ${colors.brandBrightest};
  border-radius: ${radius.default}px 0 0 ${radius.default}px;
  display: flex;
  height: 40px;
  justify-content: center;
  margin-left: ${spacing.lg}px;
  position: relative;
  transition: all ${TRANSITION_DURATION};
  vertical-align: middle;
  width: 40px;

  svg {
    color: ${colors.brand};
    height: 22px;
    position: relative;
    width: 22px;
  }
`;

class ProductListingItem extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
    }

    render() {
        const item = this.props.item;
        return (
            <ItemStyles>
                {item.image && <img src={item.image} alt={item.title}/>}
                <ProductListingHeader>
                    <Link href={{
                        pathname: '/item',
                        query: {id: item.id}
                    }}>
                        <a>
                            <Name>{item.title}</Name>
                        </a>
                    </Link>
                </ProductListingHeader>
                <PriceRow>
                    <PriceTag>{formatMoney(item.price)}</PriceTag>
                    <Incentive>
                        <Link href={{
                            pathname: '/item',
                            query: {id: item.id}
                        }}>
                            <a>
                                xem thêm
                                <br/>& mua <MdArrowForward/>
                            </a>
                        </Link>
                        <CartIcon>
                            <MdShoppingCart/>
                        </CartIcon>
                    </Incentive>
                </PriceRow>
            </ItemStyles>
        );
    }
}


export default ProductListingItem;
