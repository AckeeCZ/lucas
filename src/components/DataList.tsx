import React from 'react';
import PropTypes from 'prop-types';

import { Scrollbars } from 'react-custom-scrollbars';
import { childrenPropType } from './propTypes';
import pure from '../HOC/pure';

const dataListClassName = 'widget-data-list';

const Thumb = ({ ...props }) => (
    <div {...props} className={`${dataListClassName}__scrollbar-thumb`} />
);

const NoDataMessage = ({ message }) => (
    <div className={`${dataListClassName}__no-data-message`}>{message}</div>
);

NoDataMessage.propTypes = {
    message: PropTypes.node.isRequired,
};

export const DataListElement = ({ Element, children, ...props }) =>
    Element ? (
        <Element {...props}>{children}</Element>
    ) : (
        <table {...props}>
            <tbody>{children}</tbody>
        </table>
    );

DataListElement.propTypes = {
    Element: PropTypes.string,
    children: childrenPropType,
};

DataListElement.defaultProps = {
    Element: null,
    children: null,
};

/* eslint-disable react/no-array-index-key */
const DataList = ({
    data,
    noDataMessage,
    RowComponent,
    element,
    scrollable,
}) => {
    if (data.length === 0) {
        return <NoDataMessage message={noDataMessage} />;
    }

    const body = (
        <DataListElement className={dataListClassName} Element={element}>
            {data.map(
                (rowData, index) =>
                    React.isValidElement(RowComponent) ? (
                        React.cloneElement(RowComponent, {
                            key: `row${index}`,
                            index,
                            ...rowData,
                        })
                    ) : (
                        <RowComponent
                            key={`row${index}`}
                            index={index}
                            {...rowData}
                        />
                    ),
            )}
        </DataListElement>
    );

    if (!scrollable) {
        return body;
    }

    return (
        <Scrollbars
            renderThumbHorizontal={Thumb}
            renderThumbVertical={Thumb}
            className={`${dataListClassName}-scrollbars`}
        >
            {body}
        </Scrollbars>
    );
};

DataList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    RowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
        .isRequired,
    noDataMessage: PropTypes.node,
    scrollable: PropTypes.bool,
    element: PropTypes.string,
};

DataList.defaultProps = {
    scrollable: true,
    noDataMessage: 'Empty data',
    element: null,
};

export default pure()(DataList);
