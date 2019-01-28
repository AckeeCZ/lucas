import React from 'react';
import PropTypes from 'prop-types';
import dataListClassName from './dataListClassName';

const NoDataMessage: React.FunctionComponent<{ message: React.ReactNode }> = ({ message }) => (
    <div className={`${dataListClassName}__no-data-message`}>{message}</div>
);

NoDataMessage.propTypes = {
    message: PropTypes.node.isRequired,
};

export default NoDataMessage;
