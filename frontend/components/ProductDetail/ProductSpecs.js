import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { breakpoints, colors, fonts, spacing } from '../styles/global';
import formatMoney from "../../lib/formatMoney";

const ProductSpecsRoot = styled.div`
  padding: 0 ${spacing.md}px;

  @media (min-width: ${breakpoints.tablet}px) {
    padding: ${spacing['2xl']}px ${spacing.xl}px 0;
  }
`;

const Name = styled.h1`
  color: ${colors.brandDark};
  font-family: ${fonts.heading};
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
`;

const Description = styled.p`
  color: ${colors.text};
  font-size: 1.4rem;
  line-height: 1.5;
`;

const Price = styled.div`
  color: ${colors.brand};
  font-size: 1.8rem;
  font-weight: 500;
  letter-spacing: -0.02em;

  span {
    color: ${colors.textLight};
  }
`;


const ProductSpecs = props => {
    const {
           item:{
               title,
               description,
               price,
           }
        } = props;


    return (
        <ProductSpecsRoot>
            <Name>{title}</Name>
            <Description>{description}</Description>
            <Price>
                <span></span> {formatMoney(price)}
            </Price>
        </ProductSpecsRoot>
    );
};

ProductSpecs.propTypes = {
    item: PropTypes.object.isRequired
};

export default ProductSpecs;
