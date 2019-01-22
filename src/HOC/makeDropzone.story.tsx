import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, injectIntl } from 'react-intl';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import makeDropzone, { FS } from './makeDropzone';
import { colors, styles } from './dropzoneStyles';

const getColor = (state, isMouseOver) => {
    switch (state) {
        case FS.failed:
            return colors.failed;
        case FS.uploaded:
            return colors.uploaded;
        default:
    }
    if (isMouseOver) {
        return colors.primary;
    }
    return colors.secondary;
};

const Dropzone = makeDropzone(
    injectIntl(({ intl, isMouseOver, uploadState, size, icOk, ic, text }) => (
        <div
            style={
                !isMouseOver
                    ? {
                          ...styles.dropArea,
                          cursor:
                              uploadState === FS.uploaded ? 'auto' : 'pointer',
                          backgroundColor: getColor(uploadState, isMouseOver),
                          paddingRight: size === 'large' ? 75 : 30,
                          paddingLeft: size === 'large' ? 75 : 30,
                      }
                    : { ...styles.dropArea, ...styles.dropAreaHover }
            }
        >
            {uploadState === FS.uploaded ? (
                <img className="ic_license" src={icOk} alt={''} />
            ) : (
                <img className="ic_license" src={ic} alt={''} />
            )}

            {text && (
                <h3 style={styles.title}>{intl.formatMessage({ id: text })}</h3>
            )}

            <span className="button--blue button">
                {uploadState === FS.uploaded || uploadState === FS.failed
                    ? intl.formatMessage({
                          id: 'profile.form.license.buttonChange',
                      })
                    : intl.formatMessage({ id: 'profile.form.license.button' })}
            </span>
        </div>
    )),
);

Dropzone.propTypes = {
    ic: PropTypes.string.isRequired,
    icOk: PropTypes.string.isRequired,
    text: PropTypes.string,
    size: PropTypes.string,
};

const handleUpload = action('Dropped files');

const messages = {
    'profile.form.license.buttonChange': '+ Změnit',
    'profile.form.license.button': '+ Vybrat',
};

storiesOf('HOC|Dropzone', module)
    .add(
        'with text',
        () => (
            <IntlProvider locale="en" messages={messages}>
                <Dropzone
                    onDrop={handleUpload}
                    ic={''}
                    icOk={''}
                    size={'small'}
                />
            </IntlProvider>
        ),
    )
    .add(
        'multiple dropzone',
        () => (
            <IntlProvider locale="en" messages={messages}>
                <div>
                    <div id="dropzone1">
                        <Dropzone
                            onDrop={handleUpload}
                            ic=""
                            icOk=""
                            size={'small'}
                            wrapperId="dropzone1"
                        />
                    </div>
                    <div id="dropzone2">
                        <Dropzone
                            onDrop={handleUpload}
                            ic=""
                            icOk=""
                            size={'small'}
                            wrapperId="dropzone2"
                        />
                    </div>
                </div>
            </IntlProvider>
        ),
    )
    .add(
        'reset dropzone state',
        () => {
            let dropzone;
            return (
                <IntlProvider locale="en" messages={messages}>
                    <div>
                        <Dropzone
                            onDrop={handleUpload}
                            ic={''}
                            icOk={''}
                            size={'small'}
                            ref={ref => (dropzone = ref)}
                        />
                        <button onClick={() => dropzone.resetInput()}>Reset state</button>
                    </div>
                </IntlProvider>
            )
        },
    );
