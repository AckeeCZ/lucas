import React from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';

import errorBoundary from './errorBoundary';

interface ContentComponentProps {}

class ContentComponent extends React.Component<ContentComponentProps, { clicked: boolean }> {
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
} as React.CSSProperties;

interface SimpleErrorComponentProps {
    error: Error;
}

const SimpleErrorComponent: React.FunctionComponent<SimpleErrorComponentProps> = ({ error }) => (
    <div style={errorComponentStyles}>
        ¯\_(ツ)_/¯ Error occured:
        <p>
            <code>{error.stack}</code>
        </p>
    </div>
);

SimpleErrorComponent.propTypes = {
    error: PropTypes.instanceOf(Error).isRequired,
};

const store = createStore((initial = {}, action) => {
    return {};
});

storiesOf('HOC|Error boundary', module)
.addDecorator(story => (
    <Provider store={store}>
        {story()}
    </Provider>
))
.add(
    'basic',
    () => {
        const BoundedComponent = errorBoundary<ContentComponentProps>(SimpleErrorComponent)(
            ContentComponent,
        );
        return <BoundedComponent />;
    },
);
