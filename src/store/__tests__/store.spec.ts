import * as actions from '../actions';
import { REQ_PENDING, REQ_FULFILLED, REQ_FAILED } from '../action_types';

describe('store has action', () => {
    it('session pending', () => {
        const expected = { type: REQ_PENDING };
        expect(actions.session.pending()).toEqual(expected);
    });
    it('session fulfilled', () => {
        const expected = { type: REQ_FULFILLED };
        expect(actions.session.fulfilled()).toEqual(expected);
    });
    it('session failed', () => {
        const expected = {
            type: REQ_FAILED,
            action: { payload: { message: 'error occurred' } },
        };
        expect(actions.session.failed('error occurred')).toEqual(expected);
    });

    // it('campaign overview', () => {
    //
    // });
});
