![ackee|lucas](https://img.ack.ee/ackee/image/github/js)

# [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/AckeeCZ/lucas/blob/master/LICENSE) [![CI Status](https://img.shields.io/travis/com/AckeeCZ/lucas.svg?style=flat)](https://travis-ci.com/AckeeCZ/lucas) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request) [![Dependency Status](https://img.shields.io/david/AckeeCZ/lucas.svg?style=flat-square)](https://david-dm.org/AckeeCZ/lucas)

# Lucas

> Set of React componets, High order components and other UI tools we miss in other packages.

> Name of package refers to [Luke the evangelist](https://en.wikipedia.org/wiki/Luke_the_Evangelist) the patron of all painters.

## Table of contents

* [Installation](#installation)
* [Usage](#usage)
* [API](#api)
    * [Components](#components)
    * [Prop types](#prop-types)
    * [HOC](#hoc)    
    * [Action types](#action-types)    

## <a name="installation"></a>Installation

Using npm:

```
npm i -s @ackee/lucas
```

Using yarn:

```
yarn add @ackee/lucas
```

## <a name="api"></a>API

### Components

#### `DataList`

Component that display list of data, optionally scrollable (but scrolling is turned on in default).

Props:
* `data` (object[]): List of objects that determines data supplied to `RowComponent`.
* `RowComponent` (ReactComponent|ReactNode): Component or Element used as a list row. Paren should be `tr` to work properly.
* `noDataMessage` (ReactNode [optional]): Message displayed when data list is empty. Default is `'No data'`
* `scrollable` (boolean [optional]): Wheather display scrollbars when content overflow container. Default is `true`.
* `element` (Component|string): Determine type of list root element

Style

It's recommended to style scrollbar thumb using `widget-data-list__scrollbar-thumb` class name, because in default it's `rgba(0, 0, 0, 0)`. Below is a simple example of styling thumb (but most time it's all you need)

```css
.widget-data-list__scrollbar-thumb {
    background-color: grey;
    border-radius: inherit;
}
```

Example

```jsx
import { DataList } from '@ackee/lucas';

const data = [
    { id: 1, text: 'Text 1' },
    { id: 2, text: 'Text 2' },
    { id: 3, text: 'Text 3' },
];

const CustomRowComponent = ({ id, text }) => (
    <tr>
        <td style={rowStyle}>{id}</td>
        <td style={rowStyle}>{text}</td>
    </tr>
);

React.render(
    <div>
        <DataList data={data} RowComponent={CustomRowComponent} noDataMessage="Data list is empty" />
    </div>
)
));
```


____

### Prop types

#### `childrenPropType`

Prop type shape for `children`.

Example

```js
import { childrenPropType } from '@ackee/lucas'

MyComponent.propTypes = {
    children: childrenPropType,
};
```

____

### HOC

#### `errorBoundary(ErrorComponent): BoundedComponent`

High order component for setting error boundaries up. Implementation is very similar to that [described by React authors](https://reactjs.org/docs/error-boundaries.html).

> ![Important](./assets/alert-icon.png "Improtant note")
 You need React >= v16 and Redux in your app to make everything working properly

`ErrorComponent`: React component that shows the error. Receives
   * prop `error` which is occured error
   * all the props supplied to `BoundedComponent`

**Returns**
Component that catch any unexpected error that occured anywhere in subtree and invoke [`LOG_ERROR`]() action

Example

```jsx
import { errorBoundary } from '@ackee/lucas';

const SimpleErrorComponent = ({ error }) => (
    <div>
        Error occured!:
        <code>{error.message}</code>
    </div>
);

errorBoundary(SimpleErrorComponent)(
    <div>
        <p>Error will be caught up</p>
        <button onClick={(e) => e.callNonExistingFunction()}>Do error</button>
    </div>
);
```

#### `loadable(LoaderComponent: Component, defaultText?: string): (MyComponent) => LoadableMyComponent`

High order component that wraps your content component with supplied loader and pass prop `showLoader`
just to the loader.

HOC accepts two arguments:

* `LoaderComponent` - component that is used as a loader, so it's displayed while `showLoader` is truthy
* `defaultText` [optional] - default text that is provided to `LoaderComponent` unless `loaderText` prop is supplied to LoadableComponent

Wrapped loadable component accepts two more props:
* `showLoader` - controls if loader is visible
* `loaderText` [optional] - text that is provided into `LoaderComponent`

`LoaderComponent` receives loadable content (the component(s) hidden behind loader until load finish) as a children and two props:
* `show` - loader visibility flag
* `text` - loader text

Example

```jsx
// components/Loader.jsx
const Loader = ({ children, show, text }) => (
    <div>
        { children }
        { show && <div className="loader">{text}</div> }
    </div>
);

export default Loader;
 
// containers/Users.js
import { loadable } from '@ackee/lucas';
import Users from '../components/Users';
import Loader from '../components/Loader';

export default compose(
    connect(
        state => ({
            showLoader: isFetchingUsersSelector(state),
        })
    )
    loadable(SimpleLoader),
)(Users);
 
 // components/App.js
import Users from '../containers/Users';

const App = () => (
    <Users />
);

export default App;
```

#### `makeDropzone(GraphicComponent): DropzoneComponent`

High order component for easy making of file upload component with file dropzone.

Arguments:
* `GraphicComponent`: React component that creates dropzone graphic.

Returns:
Component that receives two extra props:
* `isMouseOver` (boolean): Determine if user drags with mouse over zone. Useful for changing dropzone style.
* `uploadState` ([FS](#file-state)): Actual state of file upload
    ```ts
    enum FS {
        failed,
        pending,
        uploading,
        uploaded
    }
    ```


Example

```jsx
import { makeDropzone, FS } from '@ackee/lucas';

makeDropzone(({ isMouseOver, uploadState }) => (
    <div style={{ backgroundColor: isMouseOver ? 'yellow' : 'grey' }}>
        <span className="button--blue button">
            {uploadState === FS.uploaded || uploadState === FS.failed ? 'Change' : 'Select'}
        </span>
    </div>
));
```

#### `pure(equalityChecker): (UnpureComponent) => PureComponent`

Makre provided component pure - it means that component not rerender until it's props change. 

Arguments:
* `equalityChecker` (function(prevProps, nextProps):bool [optional]) - Function that returns boolean which determines if prev props are equal to next props. You can provide your own eqaulity checker, if you don't provide equality checker, lodash's `isEqual` function is used.

Returns:
Function that accepts `UnpureComponent` (React component that should be optimilized for useless rerenderes) and return `PureComponent` (component that rerender only if their props change). Change is determined either by equality checker.

Example - custom equality checker

```jsx
import { pure } from '@ackee/lucas';

const customEqualityChecker = (props, nextProps) => {
    return props.data.changableProp === nextProps.data.changableProp;
};

pure(customEqualityChecker)(props => (
    <div>
        { JSON.stringify(props.data, null, 2) }
    </div>
));
```

Example - default equality checker

```jsx
import { pure } from '@ackee/lucas';

pure()(props => (
    <div>
        { JSON.stringify(props.data, null, 2) }
    </div>
));

```

-----

### Action types
