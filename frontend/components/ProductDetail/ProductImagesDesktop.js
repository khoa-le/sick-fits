import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ProductImage from './ProductImage';
import ProductThumbnails, {Thumbnail} from './ProductThumbnails';

import {spacing} from '../styles/global';

const THUMBNAIL_SIZE = '54px';

const ProductImagesDesktopRoot = styled.div`
  margin-right: ${spacing.lg}px;
  width: 440px;
`;

const Thumbnails = styled(ProductThumbnails)`
  ${Thumbnail} {
    height: ${THUMBNAIL_SIZE};
    width: ${THUMBNAIL_SIZE};
  }
`;

class ProductImagesDesktop extends Component {
    state = {
        imageFeatured: ''
    };

    selectImageFeature(image) {
        this.setState({imageFeatured: image});
    };

    render() {
        const {images} = this.props;
        const image = images[0];

        return (
            <ProductImagesDesktopRoot>
                <ProductImage
                    image={this.state.imageFeatured ? this.state.imageFeatured : image}
                    //onClick={imageOnClick}
                />
                <Thumbnails images={images} featureProductImage={this.selectImageFeature.bind(this)}/>
            </ProductImagesDesktopRoot>
        );
    }
};

ProductImagesDesktop.propTypes = {
    images: PropTypes.array.isRequired,
    imageOnClick: PropTypes.func,
    imageFeatured: PropTypes.object
};

export default ProductImagesDesktop;
