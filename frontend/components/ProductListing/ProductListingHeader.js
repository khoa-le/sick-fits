import React from 'react';
import styled from 'styled-components';
import {colors, fonts, spacing, breakpoints} from '../styles/global';

const ProductListingHeaderRoot = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 40em;
  padding: ${spacing.lg}px;
  text-align: center;
`;

const Title = styled.h3`
  color: ${colors.brandDark};
  font-family: ${fonts.heading};
  font-size: 2rem;
  letter-spacing: -0.02em;
  line-height: 1;
  margin: 0;
  margin-top: ${spacing.md}px;

  @media (min-width: ${breakpoints.desktop}px) {
    font-size: 2.4rem;
  }
`;

const Intro = styled.p`
  color: ${colors.text};
  font-size: 1rem;
  line-height: 1.4;
  margin: 0;
  margin-top: ${spacing.md}px;

  @media (min-width: ${breakpoints.desktop}px) {
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const ProductListingHeader = (props) => (
    <ProductListingHeaderRoot>
        <Title>{props.children}</Title>
    </ProductListingHeaderRoot>
)

export default ProductListingHeader;
