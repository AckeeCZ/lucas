import React from 'react';

interface DataListRootElementProps extends React.HTMLAttributes<any> {
    Element?: string | null;
    children?: React.ReactNode | React.ReactNodeArray | null;
}

const DataListRootElement: React.FunctionComponent<DataListRootElementProps> = ({
    Element,
    children,
    ...props
}) =>
    Element ? (
        <Element {...props}>{children}</Element>
    ) : (
        <table {...props}>
            <tbody>{children}</tbody>
        </table>
    );

DataListRootElement.defaultProps = {
    Element: null,
    children: null,
};

export default DataListRootElement;
