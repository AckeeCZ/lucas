module.exports = {
    presets: [
        '@babel/typescript',
        [
            '@babel/env',
            {
                modules: process.env.BABEL_ENV === 'es' ? false : 'auto',
            },
        ],
        '@babel/react',
    ],
    plugins: [
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread',
        [
            'babel-plugin-transform-imports',
            {
                lodash: {
                    transform: 'lodash/${member}',
                    preventFullImport: true,
                },
            },
        ],
    ],
    ignore: ['**/__tests__/', 'src/**/*.d.ts', 'src/**/*.story.tsx'],
};
