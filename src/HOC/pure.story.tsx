import React from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';

import pure from './pure';

const getRandFragment = () => Math.round(Math.random() * 255);
const getRandColor = () =>
    `rgb(${getRandFragment()}, ${getRandFragment()}, ${getRandFragment()})`;

const UnpureComponent: React.FunctionComponent = () => (
    <div style={{ color: getRandColor() }}>I rerendered at {Date.now()}</div>
);

class StatfulWrapper extends React.Component<{ modifyState: (state: object) => object }, {data: object}> {
    static propTypes = {
        children: PropTypes.node.isRequired,
        modifyState: PropTypes.func,
    };

    static defaultProps = {
        modifyState: (state: object): object => state,
    };

    state = {
        data: {
            foo: 'bar',
            baz: 696,
            ras: {
                al: 'ghul',
            },
        },
    };

    input: HTMLTextAreaElement | null = null;

    confirmNewState() {
        try {
            const data = this.props.modifyState(JSON.parse(this.input ? this.input.value : ''));
            this.setState({ data });
        } catch (e) {
            alert(`State is invalid, fix it: ${e.message}`);
        }
    }

    render() {
        const { data } = this.state;

        return (
            <div>
                <h3>State value</h3>
                <textarea
                    value={JSON.stringify(data, null, 4)}
                    ref={input => {
                        this.input = input;
                    }}
                    cols={100}
                    rows={10}
                    style={{ fontSize: '1.2em' }}
                    readOnly
                />
                <br />
                <button onClick={() => this.confirmNewState()}>
                    Set state again
                </button>

                <p>
                    {React.cloneElement(
                        React.Children.only(this.props.children),
                        { data },
                    )}
                </p>
            </div>
        );
    }
}

storiesOf('HOC|Pure', module)
    .add(
        'pure',
        () => {
            const PureComponent = pure()(UnpureComponent);
            return (
                <StatfulWrapper>
                    <PureComponent />
                </StatfulWrapper>
            );
        },
    )
    .add(
        'unpure',
        () => {
            return (
                <StatfulWrapper>
                    <UnpureComponent />
                </StatfulWrapper>
            );
        },
    );
