import React from 'react';
import dataListClassName from './dataListClassName';

const Thumb = ({ ...props }) => <div {...props} className={`${dataListClassName}__scrollbar-thumb`} />;

export default Thumb;
