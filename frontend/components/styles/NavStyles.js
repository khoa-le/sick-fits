import styled,{css} from 'styled-components';
import {mobile} from './global';

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 1.2rem;
  list-style-type: none;
  ${mobile(css`
    `)};
  a,
  button {
    padding: 1rem 2rem; 
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-size: 1em;
    background: none;
    border: 0;
    cursor: pointer;
    color: ${props =>props.theme.black};
    font-weight: 500;
  }
 
`;

export default NavStyles;
