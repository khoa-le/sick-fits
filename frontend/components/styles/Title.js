import styled from 'styled-components';

const Title = styled.h3`
  margin: 0 1rem;
  text-align: center;
  a {
    display: inline;
    line-height: 1.3;
    font-size: 2rem;
    text-align: center;
    font-weight:bold;
    color: ${props => props.theme.black};;
    padding: 0 1rem;
    
  }
`;

export default Title;
