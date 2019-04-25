import React from 'react';
import PropTypes from 'prop-types';
import getDisplayName from 'react-display-name';
import { omit } from 'lodash';

interface LoaderComponentProps {
    show: boolean;
    text: React.ReactNode;
}

export interface WithLoaderProps {
    showLoader: boolean;
    loaderText?: React.ReactNode;
}

const loadableFactory = (
    LoaderComponent: React.ComponentType<LoaderComponentProps>,
    defaultLoaderText: string = '',
) => (LoadableComponent: React.ComponentType) => {
    const ComponentWithLoader: React.FunctionComponent<WithLoaderProps> = ({ showLoader, loaderText, ...props }) => (
        <LoaderComponent show={showLoader} text={loaderText}>
            <LoadableComponent {...omit(props, ['children'])} />
        </LoaderComponent>
    );

    ComponentWithLoader.displayName = `Loadable(${getDisplayName(LoadableComponent)})`;
    ComponentWithLoader.propTypes = {
        showLoader: PropTypes.bool.isRequired,
        loaderText: PropTypes.node,
    };

    ComponentWithLoader.defaultProps = {
        loaderText: defaultLoaderText,
    };

    return ComponentWithLoader;
};

export default loadableFactory;
