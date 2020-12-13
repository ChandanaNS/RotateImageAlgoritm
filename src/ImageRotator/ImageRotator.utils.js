export const calculateNewDimensions = (height, width, sin, cos) => {
    const newHeight = Math.round(Math.abs(height * cos) + Math.abs(width * sin)),
      newWidth = Math.round(Math.abs(width * cos) + Math.abs(height * sin));
    return { newWidth, newHeight };
  };
  
  //Transform method uses 3 shear technique to rotate image without aliasing
  export const transform = (newX, newY, centerX, centerY, sin, cos, tan) => {
    //First shear
    let rotatedX = Math.round(newX - newY * tan),
      rotatedY = newY;
  
    //Second shear
    rotatedY = Math.round(rotatedX * sin + rotatedY);
  
    //Third shear
    rotatedX = Math.round(rotatedX - rotatedY * tan);
  
    //Add center co-ordinates to get actual x,y co-ordinates
    return {
      x: Math.round(rotatedX + centerX),
      y: Math.round(rotatedY + centerY),
    };
  };
  
  export const getImageCenter = (height, width) => ({
    centerHeight: Math.trunc(height / 2),
    centerWidth: Math.trunc(width / 2),
  });
  
  export const isRotatedPointInBounds = (newHeight, newWidth, newX, newY) =>
    newX >= 0 && newX < newWidth && newY >= 0 && newY < newHeight;
  
  export const rotate = (imageData, angle) => {
    const { originalImageData, height, width } = imageData,
      radians = angle * (Math.PI / 180),
      sin = Math.sin(radians),
      cos = Math.cos(radians),
      tan = Math.tan(radians / 2),
      { centerHeight, centerWidth } = getImageCenter(height, width),
      { newHeight, newWidth } = calculateNewDimensions(width, height, sin, cos),
      newImageData = new Uint8ClampedArray(newWidth * 4 * newHeight),
      adjustedWidth = width * 4;
  
    let y = 0;
  
    for (let i = 0; i < adjustedWidth * height; i = i + 4) {
      const x = Math.round((i % adjustedWidth) / 4);
  
      //Get x, y co-ordinates with respect to original image center
      let adjustedX = x - centerWidth;
      let adjustedY = y - centerHeight;
  
      //Apply transformations to the co-ordinates to rotate them by given angle
      const transformedPosition = transform(
        adjustedX,
        adjustedY,
        centerWidth,
        centerHeight,
        sin,
        cos,
        tan
      );
  
      //Adjust co-ordinates according to new width, height (new center)
      transformedPosition.x += Math.round((newWidth - width) / 2.0);
      transformedPosition.y += Math.round((newHeight - height) / 2.0);
  
      //If the rotated co-ordinates lie within new image dimensions store them in new image data
      if (
        isRotatedPointInBounds(
          newHeight,
          newWidth,
          transformedPosition.x,
          transformedPosition.y
        )
      ) {
        const finalPosition =
          transformedPosition.x * 4 + transformedPosition.y * (newWidth * 4);
        for (let j = 0; j < 4; j++) {
          newImageData[finalPosition + j] = originalImageData[i + j];
        }
      }
  
      if (i % adjustedWidth === 0) {
        y++;
      }
    }
    return { newImageData, newWidth, newHeight };
  };
  