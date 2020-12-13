import React, { useState } from "react";
import PropTypes from "prop-types";
import Angle from "./components/Angle";
import "./Panel.css";

const Panel = ({ changeImage, image, imageDimensions, rotateImage }) => {
  const [angle, setAngle] = useState();

  return (
    <div>
      <form>
        <label htmlFor="files" className="btn btn-primary">
          Upload Image
        </label>
        <input
          id="files"
          className="file-input"
          type="file"
          accept="image/*"
          onChange={changeImage}
        />
      </form>
      <hr></hr>
      {image && (
        <div>
          <div className="info">
            <b>{`File: `}</b> {imageDimensions.fileName} <br></br>
            <b>{`Width: `}</b> {imageDimensions.width}
            {`px`} <br></br>
            <b>{`Height: `}</b> {imageDimensions.height}
            {`px`}
          </div>

          <p className="info">
            <b>Rotate: </b>
            <Angle setAngle={setAngle} />
            <button className="btn-primary" onClick={() => rotateImage(angle)}>
              Apply
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

Panel.propTypes = {
  changeImage: PropTypes.func,
  image: PropTypes.any,
  imageDimensions: PropTypes.shape({}),
  onChange1: PropTypes.func,
};

Panel.defaultProps = {
  changeImage: () => {},
  image: null,
  imageDimensions: { width: 0, height: 0 },
  rotateImage: null,
};

export default Panel;
