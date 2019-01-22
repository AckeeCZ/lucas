import React from 'react';
import PropTypes from 'prop-types';
import { Receiver } from 'react-file-uploader';

export const FS = {
    failed: -1,
    pending: 0,
    uploading: 1,
    uploaded: 2,
};

export default DropzoneGraphic => {
    return class Dropzone extends React.Component {
        static propTypes = {
            onDrop: PropTypes.func.isRequired,
            wrapperId: PropTypes.string,
            input: PropTypes.shape({
                accept: PropTypes.string,
                multiple: PropTypes.bool,
            }),
            filesValidation: PropTypes.func,
        };

        static defaultProps = {
            wrapperId: null,
            input: {
                accept: '',
                multiple: false,
            },
            filesValidation: files => files,
        };

        static generateInputKey() {
            return Math.random().toString(36);
        }

        constructor(props) {
            super(props);
            this.state = {
                state: null,
                mouseOver: false,
                inputKey: Dropzone.generateInputKey(),
            };
            this.imageInput = null;

            window.DragEvent = 'dummy';
        }

        onDrop = files => {
            const { filesValidation, onDrop } = this.props;

            files = filesValidation(files);

            this.setState({
                state: FS.uploading,
                mouseOver: false,
            });

            if (typeof onDrop === 'function') {
                onDrop(files);

                this.setState({
                    state: files ? FS.uploaded : FS.failed,
                });
            }
        };

        handleDragOver = () => {
            if (this.state.state === FS.uploading) return;
            if (!this.state.mouseOver) {
                this.setState({
                    mouseOver: true,
                });
            }
        };

        handleDragLeave = () => {
            if (this.state.state === FS.uploading) return;
            this.setState({
                mouseOver: false,
            });
        };

        handleClick = () => {
            this.imageInput.click();
        };

        resetInput = () => {
            this.setState({
                state: null,
                mouseOver: false,
                inputKey: Dropzone.generateInputKey(),
            });
        }

        render() {
            const { onDrop, wrapperId, input, ...restProps } = this.props;

            return (
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ flex: '1' }}>
                        <Receiver
                            key="logo"
                            wrapperId={wrapperId}
                            onFileDrop={(e, files) => this.onDrop(files.map(f => f.data))}
                            isOpen
                            onDragEnter={() => {}}
                            onDragOver={this.handleDragOver}
                            onDragLeave={this.handleDragLeave}
                        >
                            <div
                                role="button"
                                tabIndex="-1"
                                onClick={this.handleClick}
                            >
                                <DropzoneGraphic
                                    isMouseOver={this.state.mouseOver}
                                    uploadState={this.state.state}
                                    {...restProps}
                                />
                            </div>
                        </Receiver>
                        <div style={{ visibility: 'hidden' }}>
                            <input
                                {...input}
                                ref={ref => (this.imageInput = ref)}
                                type="file"
                                name="photo"
                                onChange={e =>
                                    this.onDrop(Array.from(e.target.files))
                                }
                            />
                        </div>
                    </div>
                </div>
            );
        }
    };
};
