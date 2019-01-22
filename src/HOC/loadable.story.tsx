import React from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';
import styles from '@sambego/storybook-styles';

import loadable from './loadable';
import { childrenPropType } from '../components';

const ContentComponent = () => (
    <h1 style={{ color: 'red' }}>Content component</h1>
);

const LoaderOverlay = ({ children, showLoader }) => (
    <div
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'black',
            opacity: 0.7,
            display: showLoader ? 'block' : 'none',
        }}
    >
        {children}
    </div>
);

LoaderOverlay.propTypes = {
    showLoader: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
};

LoaderOverlay.defaultProps = {
    children: null,
};

const SimpleLoader = ({ children, show }) => (
    <div>
        {children}
        <LoaderOverlay showLoader={show} />
    </div>
);

SimpleLoader.propTypes = {
    children: LoaderOverlay.propTypes.children,
    show: PropTypes.bool,
};

SimpleLoader.defaultProps = {
    children: null,
    show: true,
};

const TextLoader = ({ children, text, show }) => (
    <div>
        {children}
        <LoaderOverlay showLoader={show}>
            <div style={{ color: 'red', marginTop: 150, textAlign: 'center' }}>
                {text}
            </div>
        </LoaderOverlay>
    </div>
);

TextLoader.propTypes = {
    text: PropTypes.string.isRequired,
    ...SimpleLoader.propTypes,
};

TextLoader.defaultProps = SimpleLoader.defaultProps;

class LiveLoader extends React.Component {
    state = { show: true, remaining: 3 };

    componentWillMount() {
        this.countdown();
    }

    countdown() {
        const nextRemaining = this.state.remaining - 1;
        this.setState({ remaining: nextRemaining });

        if (nextRemaining === 0) {
            this.setState({ show: false });
        } else {
            setTimeout(() => this.countdown(), nextRemaining * 1000);
        }
    }

    render() {
        const { textToExtend } = this.props;
        const { remaining, show } = this.state;
        const props = { showLoader: show };

        if (textToExtend) {
            props.loaderText = `${textToExtend} ${remaining}s`;
        }

        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, props);
        });
    }
}
// addon-storysource is not able to parse propTypes as a class static property, that's why
//  we must to define it here
LiveLoader.propTypes = {
    textToExtend: PropTypes.string,
    children: childrenPropType.isRequired,
};
LiveLoader.defaultProps = {
    textToExtend: null,
};

storiesOf('HOC|Lodable', module)
    .addDecorator(
        styles({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '500px',
        }),
    )
    .add('simple', () => {
        const LoadableComponent = loadable(SimpleLoader)(ContentComponent);
        return <LoadableComponent showLoader />;
    })
    .add('with custom text', () => {
        const LoadableComponent = loadable(
            TextLoader,
            'Loading content of my app..',
        )(ContentComponent);
        return <LoadableComponent showLoader />;
    })
    .add('loader disappear', () => {
        const LoadableComponent = loadable(
            TextLoader,
            'Loading hide after few seconds',
        )(ContentComponent);
        // showLoader is passed to LoadableComponent in LiveLoader
        return (
            <LiveLoader>
                <LoadableComponent showLoader={false} />
            </LiveLoader>
        );
    })
    .add('provide custom text in runtime', () => {
        const LoadableComponent = loadable(
            TextLoader,
            'THIS TEXT WONT BE USED',
        )(ContentComponent);
        // showLoader is passed to LoadableComponent in LiveLoader
        return (
            // the text will be extended in LiveLoader and passed down to LoadableComponent
            <LiveLoader textToExtend="Loading hide after few seconds">
                <LoadableComponent showLoader={false} />
            </LiveLoader>
        );
    });
