import styled, { css } from 'styled-components';


const Logo = styled.span`
  position: relative;
  margin:0 auto;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  
  ${p =>
    p.compact
        ? css`
          background-image: url(/static/logo_2.2_200x@2x.webp);
          width:200px;
        `
        : css`
          background-image: url(/static/logo_2.2_200x@2x.webp);
          width: 200px;
          height: 88px;
        `};
`;

export default Logo;