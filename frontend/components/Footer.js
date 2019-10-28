import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import {colors, spacing} from './styles/global';


const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${colors.brandDark};
  background: ${colors.brandBrightest};
  box-sizing: border-box;
  height: 100px;
`;


const Footer = () => (
    <Wrapper>
        <Link to="/"><a>Trang Chủ</a></Link>
    </Wrapper>
)

export default Footer;