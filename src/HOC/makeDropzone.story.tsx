import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { IntlProvider, injectIntl, InjectedIntl, intlShape } from 'react-intl';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import makeDropzone, { MakeDropzoneProps } from './makeDropzone';
import { colors, styles } from '../../stories/dropzoneStyles';

const getColor = (state: makeDropzone.FS, isMouseOver: boolean) => {
    switch (state) {
        case makeDropzone.FS.failed:
            return colors.failed;
        case makeDropzone.FS.uploaded:
            return colors.uploaded;
        default:
    }
    if (isMouseOver) {
        return colors.primary;
    }
    return colors.secondary;
};

interface InjectedProps {
    intl: InjectedIntl;
    isMouseOver: boolean;
    uploadState: makeDropzone.FS;
}

interface DropzoneAreaProps {
    ic: string;
    icOk: string;
    text?: string | null;
    size?: string | null;
}

const DropzoneArea: React.FunctionComponent<DropzoneAreaProps & InjectedProps> = ({
    intl,
    isMouseOver,
    uploadState,
    size,
    icOk,
    ic,
    text,
}) => (
    <div
        style={
            !isMouseOver
                ? {
                      ...styles.dropArea,
                      cursor: uploadState === makeDropzone.FS.uploaded ? 'auto' : 'pointer',
                      backgroundColor: getColor(uploadState, isMouseOver),
                      paddingRight: size === 'large' ? 75 : 30,
                      paddingLeft: size === 'large' ? 75 : 30,
                  }
                : { ...styles.dropArea, ...styles.dropAreaHover }
        }
    >
        {uploadState === makeDropzone.FS.uploaded ? (
            <img className="ic_license" src={icOk} alt={''} />
        ) : (
            <img className="ic_license" src={ic} alt={''} />
        )}

        {text && <h3 style={styles.title}>{intl.formatMessage({ id: text })}</h3>}

        <span className="button--blue button">
            {uploadState === makeDropzone.FS.uploaded || uploadState === makeDropzone.FS.failed
                ? intl.formatMessage({
                      id: 'profile.form.license.buttonChange',
                  })
                : intl.formatMessage({ id: 'profile.form.license.button' })}
        </span>
    </div>
);

DropzoneArea.propTypes = {
    intl: intlShape.isRequired,
    isMouseOver: PropTypes.bool.isRequired,
    uploadState: PropTypes.oneOf(Object.values(makeDropzone.FS)),
    ic: PropTypes.string.isRequired,
    icOk: PropTypes.string.isRequired,
    text: PropTypes.string,
    size: PropTypes.string,
};

type DropzoneType = React.ReactElement<{}> & { resetInput: () => void };

const Dropzone = compose<
    React.ComponentType<DropzoneAreaProps & MakeDropzoneProps & React.RefAttributes<DropzoneType>>
>(
    makeDropzone,
    injectIntl,
)(DropzoneArea);

const handleUpload = action('Dropped files');

const messages = {
    'profile.form.license.buttonChange': '+ Změnit',
    'profile.form.license.button': '+ Vybrat',
};

storiesOf('HOC|Dropzone', module)
    .add('with text', () => (
        <IntlProvider locale="en" messages={messages}>
            <Dropzone onDrop={handleUpload} ic={''} icOk={''} size={'small'} />
        </IntlProvider>
    ))
    .add('multiple dropzone', () => (
        <IntlProvider locale="en" messages={messages}>
            <div>
                <div id="dropzone1">
                    <Dropzone onDrop={handleUpload} ic="" icOk="" size={'small'} wrapperId="dropzone1" />
                </div>
                <div id="dropzone2">
                    <Dropzone onDrop={handleUpload} ic="" icOk="" size={'small'} wrapperId="dropzone2" />
                </div>
            </div>
        </IntlProvider>
    ))
    .add('reset dropzone state', () => {
        let dropzone: DropzoneType;
        return (
            <IntlProvider locale="en" messages={messages}>
                <div>
                    <Dropzone
                        onDrop={handleUpload}
                        ic={''}
                        icOk={''}
                        size={'small'}
                        ref={(ref: typeof dropzone) => (dropzone = ref)}
                    />
                    <button onClick={() => dropzone.resetInput()}>Reset state</button>
                </div>
            </IntlProvider>
        );
    });
