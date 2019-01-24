import { logging as actionTypes } from '../actionTypes';

export function logError(error: Error, extra: object) {
    return {
        type: actionTypes.LOG_ERROR,
        error,
        extra,
    };
}
