import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import Pagination from './Pagination';
import {perPage} from '../config';
import {formatDistance} from 'date-fns';
import Error from './ErrorMessage';
import styled from 'styled-components';
import OrderItemStyles from "./styles/OrderItemStyles";
import Link from 'next/link';
import formatMoney from '../lib/formatMoney';

const USER_ORDERS_QUERY = gql`
    query USER_ORDERS_QUERY {
        orders(orderBy: createdAt_DESC){
            id
            total
            createdAt
            items{
                id
                title
                price
                description
                quantity
                image
            }
        }
    }
`;

const orderUl = styled.ul` 
    display:grid;
    grid-gap: 4rem;
    grid-template-columns: repeat(auto-fit,minax(40%, 1fr));
`

class OrderList extends Component {
    render() {
        return (
            <Query query={USER_ORDERS_QUERY}>
                {({data: {orders}, error, loading}) => {
                    if (loading) return <p>Loading....</p>
                    if (error) return <Error error={error}/>
                    console.log(orders);
                    return (
                        <div>
                            <h2>You have {orders.length} orders</h2>
                            <orderUl>
                                {orders.map(order => (
                                    <OrderItemStyles key={order.id}>
                                        <Link href={{
                                            pathname: '/order',
                                            query: {id: order.id},
                                        }}>
                                            <a>
                                                <div className='order-meta'>
                                                    <p>{order.items.reduce((a, b) => a + b.quantity, 0)} Items</p>
                                                    <p>{order.items.length} Products</p>
                                                    <p>{formatDistance(order.createdAt, new Date())}</p>
                                                    <p>{formatMoney(order.total)}</p>
                                                </div>
                                                <div className="images">
                                                    {order.items.map(item=>(
                                                        <img key={item.id} src={item.image} alt={item.title}/>
                                                    ))}
                                                </div>
                                            </a>
                                        </Link>

                                    </OrderItemStyles>
                                ))}
                            </orderUl>
                        </div>
                    )
                }}
            </Query>
        );
    }
}

export default OrderList;
