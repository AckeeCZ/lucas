import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import getDisplayName from '../helpers/componentName';

const loadableFactory = (LoaderComponent, defaultLoaderText = '') =>
    (LoadableComponent) => {
        const ComponentWithLoader = ({ showLoader, loaderText, ...props }) => (
            <LoaderComponent show={showLoader} text={loaderText}>
                <LoadableComponent {..._.omit(props, ['children'])} />
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
