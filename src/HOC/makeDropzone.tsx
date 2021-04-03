import React from 'react';
import PropTypes from 'prop-types';
import ReactDropzone from 'react-dropzone';
import { Subtract } from 'utility-types';
import { identity } from 'lodash';

enum FS {
    failed = -1,
    pending = 0,
    uploading = 1,
    uploaded = 2,
}

interface InjectedProps {
    isMouseOver: boolean;
    uploadState: FS | null;
}

interface DropzoneState {
    state: FS | null;
    mouseOver: boolean;
    inputKey: string;
}

export interface MakeDropzoneProps {
    onDrop: (files: File[]) => void;
    wrapperId?: string | null;
    input?: {
        accept?: string;
        multiple?: boolean;
    };
    filesValidation?: (files: File[]) => File[];
}

function makeDropzone<WrappedProps extends InjectedProps>(DropzoneGraphic: React.ComponentType<InjectedProps>) {
    type DropzoneProps = Subtract<WrappedProps, InjectedProps> & MakeDropzoneProps;

    return class Dropzone extends React.Component<DropzoneProps, DropzoneState> {
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
            filesValidation: identity,
        };

        constructor(props: DropzoneProps) {
            super(props);
            this.state = {
                state: null,
                mouseOver: false,
                inputKey: Dropzone.generateInputKey(),
            };
            (window as any).DragEvent = 'dummy';
        }

        static generateInputKey() {
            return Math.random().toString(36);
        }

        onDrop = (files: File[]) => {
            const { filesValidation, onDrop } = this.props;

            if (typeof filesValidation === 'function') {
                files = filesValidation(files);
            }

            this.setState({
                state: FS.uploading,
                mouseOver: false,
            });

            onDrop(files);

            this.setState({
                state: files ? FS.uploaded : FS.failed,
            });
        };

        handleDragOver = () => {
            if (this.state.state === FS.uploading) {
                return;
            }
            if (!this.state.mouseOver) {
                this.setState({
                    mouseOver: true,
                });
            }
        };

        handleDragLeave = () => {
            if (this.state.state === FS.uploading) {
                return;
            }
            this.setState({
                mouseOver: false,
            });
        };

        resetInput = () => {
            this.setState({
                state: null,
                mouseOver: false,
                inputKey: Dropzone.generateInputKey(),
            });
        };

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
                        <ReactDropzone
                            onDrop={this.onDrop}
                            onDragEnter={() => null}
                            onDragOver={this.handleDragOver}
                            onDragLeave={this.handleDragLeave}>
                            {({getRootProps, getInputProps}) => (
                                <div {...getRootProps({role: 'button'})}>
                                    <input {...getInputProps(input)} />
                                    <DropzoneGraphic
                                        isMouseOver={this.state.mouseOver}
                                        uploadState={this.state.state}
                                        {...restProps}
                                    />
                                </div>
                            )}
                        </ReactDropzone>
                    </div>
                </div>
            );
        }
    };
}

makeDropzone.FS = FS;

export default makeDropzone;
