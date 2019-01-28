import React from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';

import dataListClassName from './dataListClassName';
import NoDataMessage from './NoDataMessage';
import DataListRootElement from './DataListRootElement';
import Thumb from './Thumb';

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
        <DataListRootElement className={dataListClassName} Element={element}>
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
        </DataListRootElement>
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
