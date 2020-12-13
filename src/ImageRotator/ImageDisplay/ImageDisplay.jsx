import React from 'react';
import PropTypes from 'prop-types';
import './ImageDisplay.css';

const ImageDisplay = ({image, rotatedImage,}) => {
    const finalImage = rotatedImage ? rotatedImage : image;
    return (
            <div className='image-frame'>
            {finalImage ? finalImage : <div className='placeholder-text'>Please select an image</div>}
        </div>
        
    );
};

ImageDisplay.propTypes = {
    image: PropTypes.any,
    rotatedImage: PropTypes.any,
};

ImageDisplay.defaultProps = {
    image: null,
    rotatedImage: null,
};

export default ImageDisplay;