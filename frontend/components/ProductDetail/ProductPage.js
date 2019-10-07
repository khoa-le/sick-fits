import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import styled from 'styled-components';
import Head from 'next/head';
import BackLink from './BackLink';
import Error from '../ErrorMessage';
import ProductSpecs from "./ProductSpecs";
import ProductForm from './ProductForm';
import ProductImageDesktop from './ProductImagesDesktop';
import {breakpoints} from '../styles/global';

const ProductPageStyles = styled.div`
   
`;

const Container = styled.div`
  @media (min-width: ${breakpoints.desktop}px) {
    align-items: flex-start;
    display: flex;
  }
`;

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id:ID!){
        item(where: {id: $id}){
            id
            title
            description
            image
            largeImage
            image_2
            price
        }
    }
`


class ProductPage extends Component {
    productImageFeatured(image){
        return [image]
    };
    render() {

        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{id: this.props.id}}>
                {({error, loading, data}) => {
                    if (error) return <Error error={error}/>;
                    if (loading) return <p>Loading....</p>;
                    if (!data.item) return <p>No Item Found for {this.props.id}</p>;

                    const item = data.item;
                    const productImages = [item.image];
                    if(item.image_2 !==null) productImages.push(item.image_2);
                    return <ProductPageStyles>
                        <Head>
                            <title>Sick Fits | {item.title}</title>
                        </Head>
                        <Container>
                            <ProductImageDesktop
                                images={productImages}
                                //imageOnClick={toggleProductImagesBrowser}
                                //imageFeatured={this.productImageFeatured}
                            >
                            </ProductImageDesktop>
                            <div className="details">
                                <BackLink>Quay Lại</BackLink>
                                <ProductSpecs item={item}/>
                                <ProductForm item={item}/>
                            </div>
                        </Container>
                    </ProductPageStyles>

                }}

            </Query>
        );
    }
}

export default ProductPage;
