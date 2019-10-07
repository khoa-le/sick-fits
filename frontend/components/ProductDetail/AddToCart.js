import {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import {CURRENT_USER_QUERY} from "../User";
import { Submit } from '../shared/FormElement';

const ADD_TO_CART_MUTATION = gql`
    mutation addToCart($id: ID!, $quantity: Int!){
        addToCart(id: $id, quantity: $quantity){
            id
            quantity
        }
    }
`;


const AddToCartButton = styled(Submit)`
  align-self: flex-end;
  flex-grow: 1;
  height: ${props => (props.fullWidth ? 'auto' : '')};
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
`;

class AddToCart extends Component {
    render() {
        const {id,quantity} = this.props;
        return (
            <Mutation mutation={ADD_TO_CART_MUTATION}
                      variables={{id: id,quantity: quantity}}
                      refetchQueries={[{query: CURRENT_USER_QUERY}]}
            >
                {(addToCart,{loading}) => <AddToCartButton type="submit" disabled={loading} onClick={addToCart}>
                    {loading && 'Đang thêm'} {!loading && 'Thêm vào giỏ'}
                </AddToCartButton>}
            </Mutation>

        );
    }
}

export default AddToCart;
