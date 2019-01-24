declare module 'react-file-uploader' {
    export enum status {
        ABORTED = -2,
        FAILED = -1,
        PENDING = 0,
        UPLOADING = 1,
        UPLOADED = 2,
    }

    export interface Upload {
        id: string;
        status: status;
        progress: number;
        src: null;
        data: File;
    }

    interface ReceiverProps extends React.Attributes {
        customClass?: string | string[];
        isOpen: boolean;
        onDragEnter: (e: DragEvent) => void;
        onDragOver?: () => void;
        onDragLeave: (e: DragEvent) => void;
        onFileDrop: (e: DragEvent, uploads: Upload[]) => void;
        style?: object | null;
        wrapperId?: string | null;
    }

    interface ReceiverState {
        dragLevel: number;
    }

    export class Receiver extends React.Component<ReceiverProps> {}
}
