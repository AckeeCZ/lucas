import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getDisplayName from 'react-display-name';

import actions from '../services/actions';

interface InjectedProps {
    error: Error;
}

interface ErrorBoundaryState {
    error: Error | null;
}

interface DispatchProps {
    logError: (error: Error, info: object) => void;
}

function errorBoundary<ComponentToBoundProps>(
    ErrorComponent: React.ComponentType<ComponentToBoundProps & InjectedProps>,
) {
    type ErrorBoundaryProps = ComponentToBoundProps & DispatchProps;

    return (ComponentToBound: React.ComponentType<ComponentToBoundProps>) => {
        class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
            static displayName = `ErrorBoundary(${getDisplayName(ComponentToBound)})`;

            static propTypes = {
                logError: PropTypes.func.isRequired,
            };

            constructor(props: ErrorBoundaryProps) {
                super(props);
                this.state = {
                    error: null,
                };
            }

            componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
                this.setState({ error });
                this.props.logError(error, { extra: errorInfo });
            }

            render() {
                const { error } = this.state;
                return error ? <ErrorComponent {...this.props} error={error} /> : <ComponentToBound {...this.props} />;
            }
        }

        return connect<{}, DispatchProps, ComponentToBoundProps>(
            null,
            {
                logError: actions.logging.logError,
            },
        )(ErrorBoundary as any);
    };
};

export default errorBoundary;
