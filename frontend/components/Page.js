import React from 'react'
import styled, {ThemeProvider, createGlobalStyle} from 'styled-components';
import Header from './Header';
import Meta from './Meta';
import Footer from './Footer';


const theme = {
    red: '#ff0000',
    black: '#393939',
    grey: '#3A3A3A',
    lightGrey: '#E1E1E1',
    green: '#13C83A',
    offWhite: '#EDEDED',
    maxWidth: '1000px',
    bs: '0 12px 24px 0 rgba(0,0,0,0.09)'
};

const StyledPage = styled.div`
    background: white;
    color: ${props => props.theme.black};
    //margin-bottom: 100px;
`;

const Inner = styled.div`
    max-width:${props => props.theme.maxWidth};
    margin:0 auto;
    padding: 2rem;
`;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-weight:normal;
    font-style:normal;
  }
  html{
    box-sizing: border-box;;
    font-size:10px;
  }
  *,*:before, *:after{
    box-sizing:inherit;
  }
  body{
    padding:0px;
    margin:0;
    font-size: 1.5rem;
    line-height: 2;
  }
  a{
    text-decoration: none;
    color: ${theme.black};
  }
  p{
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
`;

class MyPage extends React.Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <StyledPage>
                    <Meta/>
                    <Header/>
                    <Inner>
                        {this.props.children}
                    </Inner>
                    <Footer/>
                </StyledPage>
            </ThemeProvider>
        )
    }
}

export default MyPage;
