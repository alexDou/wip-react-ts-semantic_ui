import { REQ_PENDING, REQ_FULFILLED, REQ_FAILED } from '../action_types';

const actions = {
    pending: () => ({ type: REQ_PENDING }),

    fulfilled: () => ({ type: REQ_FULFILLED }),

    failed: (message: string) => {
        const action = { payload: { message } };
        return {
            type: REQ_FAILED,
            action
        };
    }
};

export default actions;
