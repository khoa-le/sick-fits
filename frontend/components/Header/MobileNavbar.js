import React from 'react';
import {bool} from 'prop-types';
import styled,{css} from 'styled-components';
import Link from 'next/link';
import {colors, mobile} from "../styles/global";
import NavStyles from "../styles/NavStyles";
import Signout from "../Signout";
import {Mutation} from "react-apollo";
import {TOGGLE_CART_MUTATION} from "../Cart";
import CartCount from "../CartCount";
import User from "../User";


const StyledMenu = styled.ul`
  display: flex;
  flex-direction: column;
  background: ${colors.brandBrighter};
  min-height: 100vh;
  text-align: left;
  justify-content: flex-start;
  padding: 6rem 2rem 2rem;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0rem;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  width: 300px;
  ${mobile(css`
     width: 100%;
    `)};

  li{
  list-style-type: none;
   a {
    font-size: 1.4rem;
    padding: 2rem 0;
    font-weight: bold;
    color: ${colors.brandDarker};
    text-decoration: none;
    transition: color 0.3s linear;
    ${mobile(css`
        font-size: 1.5rem;
        text-align: center;
    `)}


    &:hover {
      color: ${colors.brandDark};
    }
  }
  }
 
`;

const MobileNavbar = ({open}) => {
    return (
        <User>
            {({data: {me}}) => (
                <StyledMenu open={open}>
                    <li>
                        <Link href="/">
                            <a>Sản Phẩm</a>
                        </Link>
                    </li>
                    {me && (
                        <>
                            <li>
                                <Link href="/sell">
                                    <a>Tạo Sản Phẩm</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/orders">
                                    <a>Đơn Hàng</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/me">
                                    <a>Tài Khoản</a>
                                </Link>
                            </li>
                            <li>
                                <Signout/>
                            </li>
                        </>
                    )}
                    {!me && (
                        <li>
                            <Link href="/signup">
                                <a>Đăng Ký</a>
                            </Link>
                        </li>
                    )}
                </StyledMenu>
            )
            }
        </User>
    )
}

MobileNavbar.propTypes ={
    open: bool.isRequired,
}

export default MobileNavbar;