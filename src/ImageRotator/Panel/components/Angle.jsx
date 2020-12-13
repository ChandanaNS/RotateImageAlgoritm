import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './Angle.css';

const DEGREE_PATTERN = '([0-9]|[1-8][0-9]|9[0-9]|[12][0-9]{2}|3[0-5][0-9]|360)';

const Angle = ({setAngle}) => {
    const [sanitizedValue, setSanitizedValue] = useState();

    const onInputChange = (e) => {
        console.log(e.target.value);
        const inputValue = (e.target.validity.valid) ? e.target.value : sanitizedValue;
        setSanitizedValue(inputValue);
    };

    useEffect(() => setAngle(sanitizedValue), [setAngle, sanitizedValue]);

    return (
        <input className="input-box" type='text' pattern={DEGREE_PATTERN}
              placeholder='Degrees' value={sanitizedValue}
              onInput={onInputChange}/>
    );
};

Angle.propTypes = {
    setAngle: PropTypes.func
};

Angle.defaultProps = {
    setAngle: () => {}
};

export default Angle;