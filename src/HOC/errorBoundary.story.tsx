import React from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';

import { storiesOf } from '@storybook/react';

import errorBoundary from './errorBoundary';

class ContentComponent extends React.Component {
    state = { clicked: false };

    render() {
        if (this.state.clicked === true) {
            throw new Error('I crashed!');
        }

        return (
            <h1 onClick={() => this.setState({ clicked: true })}>
                Click on me to fail
            </h1>
        );
    }
}

const errorComponentStyles = {
    margin: 'auto',
    backgroundColor: 'white',
    textAlign: 'center',
};

const SimpleErrorComponent = ({ error }) => (
    <div style={errorComponentStyles}>
        ¯\_(ツ)_/¯ Error occured:
        <p>
            <code>{error.stack}</code>
        </p>
    </div>
);

SimpleErrorComponent.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.string,
        stack: PropTypes.string,
    }).isRequired,
};

const store = createStore((initial = {}, action) => {
    return {};
});

storiesOf('HOC|Error boundary', module).add(
    'basic',
    () => {
        const BoundedComponent = errorBoundary(SimpleErrorComponent)(
            ContentComponent,
        );
        return <BoundedComponent store={store} />;
    },
);
