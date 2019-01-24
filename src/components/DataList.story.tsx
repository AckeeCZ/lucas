import React from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';

import DataList from './DataList';

const data = [
    {
        id: 1,
        text:
            'How about a magic trick? I\'m gonna make this pencil disappear. Ta-da!',
    },
    { id: 2, text: 'Do I really look like a guy with a plan?' },
    {
        id: 3,
        text:
            'You have nothing, nothing to threaten me with. Nothing to do with all your strength.',
    },
    { id: 4, text: 'If you\'re good at something, never do it for free.' },
    { id: 5, text: 'I just want my phone call.' },
    {
        id: 6,
        text: 'Accomplice? I\'m gonna tell them the whole thing was your idea.',
    },
    {
        id: 7,
        text:
            'Well, you see... I\'m buying this hotel and setting some new rules about the pool area.',
    },
    { id: 8, text: 'I\'m not wearing hockey pads.' },
    { id: 9, text: 'My anger outweights my guilt.' },
];

const rowStyle = {
    borderBottom: '1px dotted',
    padding: 5,
} as React.CSSProperties;

interface RowComponentProps {
    id: number;
    text: string;
    index: number;
}

const RowComponent: React.FunctionComponent<RowComponentProps> = ({ id, text }) => (
    <tr>
        <td style={rowStyle}>{id}</td>
        <td style={rowStyle}>{text}</td>
    </tr>
);

RowComponent.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};

const wrapperStyle = {
    border: '2px solid blue',
    height: 200,
    width: 300,
};

interface WrapperProps {
}

const Wrapper: React.FunctionComponent<WrapperProps> = (props) => (
    <div style={wrapperStyle}>
        <style
            dangerouslySetInnerHTML={{
                __html: `
            .widget-data-list__scrollbar-thumb {
                background-color: grey;
                border-radius: inherit;
            }
        `,
            }}
        />
        {props.children}
    </div>
);

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

storiesOf('Components|DataList', module)
    .add(
        'default',
        () => (
            <Wrapper>
                <DataList data={data} RowComponent={RowComponent} />
            </Wrapper>
        ),
    )
    .add(
        'not scrollable',
        () => (
            <Wrapper>
                <DataList
                    data={data}
                    RowComponent={RowComponent}
                    scrollable={false}
                />
            </Wrapper>
        ),
    )
    .add(
        'custom no data message',
        () => (
            <Wrapper>
                <DataList
                    data={[]}
                    RowComponent={RowComponent}
                    noDataMessage="Harry stold all my data"
                />
            </Wrapper>
        ),
    );
