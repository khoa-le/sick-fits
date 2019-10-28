import React, {useState, useRef} from 'react';
import Link from 'next/link';
import Nav from './Header/Nav';
import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
import {colors, spacing} from './styles/global';
import Cart from './Cart';
import Search from './Search';
import Logo from './Header/Logo';
import MobileNavbar from './Header/MobileNavbar';
import Burger from "./Header/Burger";
import {useOnClickOutside,useOnClickLink} from './shared/hooks';

Router.onRouteChangeStart = () => {
    NProgress.start();
};
Router.onRouteChangeComplete = () => {
    NProgress.done();
};
Router.onRouteChangeError = () => {
    NProgress.done();
};

const Wrapper = styled.nav`
  position: relative;
  box-sizing: border-box;
  z-index: 3;
  width: 100%;
  font-weight: 500;
  background: ${({transparent}) => (transparent ? 'transparent' : colors.lightest)}; 
  transition: background 300ms ease-out;
  padding: 0;
  border-bottom: 1px solid #f5f3f7;
`;
const StartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const EndWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const NormalNavbar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${spacing.md};
  justify-content: space-between;
`;
const LogoLink = styled(Link).attrs((/* props */) => ({
    href: '/',
}))`
  display: inline-block;
  vertical-align: center;
  margin-right: ${spacing.lg};
`;

const Header = () => {
    const [open, setOpen] = useState(false);
    const node = useRef();
    useOnClickOutside(node, () => setOpen(false));
    Router.events.on('routeChangeComplete', (url) => {
         setOpen(false);
    });
    return <Wrapper ref={node}>
        <NormalNavbar>
            <StartWrapper>
                <Burger open={open} setOpen={setOpen}/>
                <LogoLink>
                    <Logo/>
                </LogoLink>
                <Nav/>
            </StartWrapper>
            <EndWrapper>
                <Cart/>
            </EndWrapper>
        </NormalNavbar>
        <MobileNavbar open={open} setOpen={setOpen}/>
        {/*<div className="sub-bar">*/}
        {/*    <Search/>*/}
        {/*</div>*/}
    </Wrapper>
};

export default Header;