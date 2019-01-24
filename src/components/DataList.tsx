import React from 'react';
import PropTypes from 'prop-types';

import Scrollbars from 'react-custom-scrollbars';

const dataListClassName = 'widget-data-list';

const Thumb = ({ ...props }) => <div {...props} className={`${dataListClassName}__scrollbar-thumb`} />;

const NoDataMessage: React.FunctionComponent<{ message: React.ReactNode }> = ({ message }) => (
    <div className={`${dataListClassName}__no-data-message`}>{message}</div>
);

NoDataMessage.propTypes = {
    message: PropTypes.node.isRequired,
};

interface DataListElementProps extends React.HTMLAttributes<any> {
    Element?: string | null;
    children?: React.ReactNode | React.ReactNodeArray | null;
}

export const DataListElement: React.FunctionComponent<DataListElementProps> = ({ Element, children, ...props }) =>
    Element ? (
        <Element {...props}>{children}</Element>
    ) : (
        <table {...props}>
            <tbody>{children}</tbody>
        </table>
    );

DataListElement.defaultProps = {
    Element: null,
    children: null,
};

type RowElement<P> = React.ReactElement<{ index: number } & P>;

// TODO LHo - invent how to better type any props for RowComponent.
//  DataList know nothing about these props while they're not it's bussiness
interface DataListProps<P = any> {
    data: P[];
    RowComponent: React.ComponentType<{ index: number } & P> | RowElement<P>;
    noDataMessage?: React.ReactNode | null;
    scrollable?: boolean | null;
    element?: string | null;
}

const isRowElement = (row: any): row is RowElement<any> => React.isValidElement(row);

/* eslint-disable react/no-array-index-key */
const DataList: React.FunctionComponent<DataListProps> = ({
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
            {data.map((rowData, index) =>
                isRowElement(RowComponent) ? (
                    React.cloneElement(RowComponent, {
                        key: `row${index}`,
                        index,
                        ...rowData,
                    })
                ) : (
                    <RowComponent key={`row${index}`} index={index} {...rowData} />
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
    data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    RowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
    noDataMessage: PropTypes.node,
    scrollable: PropTypes.bool,
    element: PropTypes.string,
};

DataList.defaultProps = {
    scrollable: true,
    noDataMessage: 'Empty data',
    element: null,
};

export default DataList;
