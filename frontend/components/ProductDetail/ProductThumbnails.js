import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {breakpoints, colors, radius, spacing} from '../styles/global';

const THUMBNAIL_SIZE = '44px';

const ProductThumbnailsRoot = styled.div`
  height: ${THUMBNAIL_SIZE};
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  width: 100%;

  @media (min-width: ${breakpoints.desktop}px) {
    height: auto;
    overflow-x: hidden;
  }
`;

export const ProductThumbnailsContent = styled.div`
  display: inline-flex;
  height: 100%;
  padding-left: ${spacing.md}px;

  @media (min-width: ${breakpoints.desktop}px) {
    justify-content: center;
    min-width: 100%;
    padding: ${spacing.lg}px 0 0;
  }
`;

export const Thumbnail = styled.a`
  border: 1px solid ${colors.brandBright};
  border-radius: ${radius.default}px;
  height: ${THUMBNAIL_SIZE};
  margin-right: ${spacing.md}px;
  width: ${THUMBNAIL_SIZE};

  @media (min-width: ${breakpoints.desktop}px) {
    cursor: pointer;
    margin-right: ${spacing.md}px;
  }
`;

class ProductThumbnails extends Component {
    handleClick = (image, callback) => event => {
        event.preventDefault();
        console.log("Handle click",image);
        callback(image);
    };

    render() {
        const {images,featureProductImage, className = ''} = this.props;

        return (
            <ProductThumbnailsRoot className={className}>
                <ProductThumbnailsContent>
                    {images.map((image, idx) => {
                        if(image==null) return null;
                        const thumbImage= image.replace('image/upload/','image/upload/c_scale,w_52/');
                        return (
                            <Thumbnail
                                key={image}
                                onClick={this.handleClick(image, featureProductImage)}
                                href={image}
                            >
                                <img src={thumbImage}/>
                            </Thumbnail>
                        );
                    })}
                </ProductThumbnailsContent>
            </ProductThumbnailsRoot>
        );
    }
}

ProductThumbnails.propTypes = {
    images: PropTypes.array.isRequired,
    featureProductImage: PropTypes.func,
    className: PropTypes.string
};

export default ProductThumbnails;
