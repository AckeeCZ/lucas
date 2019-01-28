declare module '@sambego/storybook-styles' {
    import { StoryDecorator } from '@storybook/react';

    export default function(stylesObject: object): StoryDecorator;
}
