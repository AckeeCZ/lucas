import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import getDisplayName from '../helpers/componentName';
import * as loggingActions from '../actions/loggingActions';

const errorBoundary = ErrorComponent => ComponentToBound => {
    class ErrorBoundary extends React.Component {
        static displayName = `ErrorBoundary(${getDisplayName(
            ComponentToBound,
        )})`;

        static propTypes = {
            logError: PropTypes.func.isRequired,
        };

        constructor(props) {
            super(props);
            this.state = {
                error: null,
            };
        }

        componentDidCatch(error, errorInfo) {
            this.setState({ error });
            this.props.logError(error, { extra: errorInfo });
        }

        render() {
            const { error } = this.state;
            return error ? (
                <ErrorComponent {...this.props} error={error} />
            ) : (
                <ComponentToBound {...this.props} />
            );
        }
    }

    return connect(
        null,
        dispatch => ({
            logError: bindActionCreators(loggingActions.logError, dispatch),
        }),
    )(ErrorBoundary);
};

export default errorBoundary;
