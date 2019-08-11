import { Dispatch } from 'redux';

import { data as dataAPI } from '../../api';
import { session } from './';
import { GET_SEARCH } from '../action_types';

const actions = {
    getSearch: (query: string, page: number = 1) => {
        return async (dispatch: Dispatch) => {
            try {
                dispatch(session.pending());

                const response = await dataAPI.search_repos(query, page);
                dispatch({ type: GET_SEARCH, payload: response.data });
                dispatch(session.fulfilled());
            } catch (e) {
                dispatch(session.failed(e.message));
            }
        };
    }
};

export default actions;
