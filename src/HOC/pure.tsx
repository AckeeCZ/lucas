import React from 'react';
import _ from 'lodash';
import getDisplayName from 'react-display-name';

function defaultEqualityChecker<P>(props: P, nextProps: P): boolean {
    return _.isEqual(props, nextProps);
};

function pure<P>(equalityChecker: typeof defaultEqualityChecker = defaultEqualityChecker) {
    return (UnpureComponent: React.ComponentType<P>): React.ComponentClass<P> => {
        class PureComponent extends React.Component<P> {
            static displayName = `Pure(${getDisplayName(UnpureComponent)})`;

            shouldComponentUpdate(nextProps: P) {
                return !equalityChecker<P>(this.props, nextProps);
            }

            render() {
                return <UnpureComponent {...this.props} />;
            }
        }

        return PureComponent;
    };
};

export default pure;
