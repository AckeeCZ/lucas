import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withOptions } from '@storybook/addon-options';

const req = require.context('../src', true, /\.story\.(ts|js)x?$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator((story, context) => withInfo('')(story)(context));
addDecorator(
    withOptions({
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    })
);

configure(loadStories, module);
