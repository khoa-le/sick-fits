import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import {Page} from '@shopify/polaris';
import ProductListingItem from './ProductListingItem';
import {perPage} from '../../config';


const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY($skip: Int =0, $first: Int = ${perPage}){
        items(first:$first,skip: $skip, orderBy: id_DESC) {
            id
            title
            price
            description
            image
            largeImage
        }
    }
`;

const Center = styled.div`
    text-align: center;
`;
const ItemList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    
`

class Items extends Component {
    render() {
        return (
            <Page title="Sản Phẩm">
                <Query
                    query={ALL_ITEMS_QUERY}
                    variables={{
                        skip: this.props.page * perPage - perPage,
                        first: perPage,
                    }}>
                    {({data, error, loading}) => {
                        if (loading) return <p>Loading...</p>
                        if (error) return <p>Error: {error.message} </p>
                        return <>
                            <ItemList>
                                {data.items.map(item => <ProductListingItem item={item} key={item.id}></ProductListingItem>)}
                            </ItemList>

                        </>

                    }}
                </Query>
            </Page>
        );
    }
}

export default Items;
export {ALL_ITEMS_QUERY};
