import React from 'react';
import _ from 'lodash';

import getDisplayName from '../helpers/componentName';

const defaultEqualityChecker = (props, nextProps) => _.isEqual(props, nextProps);

const pure = (equalityChecker = defaultEqualityChecker) =>
    UnpureComponent => {
        class PureComponent extends React.Component {
            static displayName = `Pure(${getDisplayName(UnpureComponent)})`

            shouldComponentUpdate(nextProps) {
                return !equalityChecker(this.props, nextProps);
            }

            render() {
                return <UnpureComponent {...this.props} />;
            }
        }

        return PureComponent;
    };

export default pure;
