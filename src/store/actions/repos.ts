import { TDispatch, ActionType, ActionCreate, ThunkActionCreate } from '@t/app';
import { api } from '@api/index';
import { session } from './';
import { CALL_SEARCH, FIND_QUERY, TURN_PAGE } from '../action_types';

const getSearch: ThunkActionCreate = (query: string, page: number) => {
    return async (dispatch: TDispatch): Promise<ActionType> => {
        // eslint-disable-next-line no-console
        console.log('GET search called')
        try {
            dispatch(session.pending());
            const response: any = await api.search_repos(query, page);
            dispatch({
                type: CALL_SEARCH,
                payload: {
                    repos: response.data
                }
            });
            return dispatch(session.fulfilled());
        } catch (err) {
            return dispatch(session.failed(err.message));
        }
    };
};

const setSearchQuery: ActionCreate = (query: string) => {
    return (dispatch: TDispatch): ActionType => {
        return dispatch({
            type: FIND_QUERY,
            payload: { query, repos: {}, shouldFetch: true }
        });
    };
};

const setPage: ActionCreate = (page: number, shouldFetch: boolean) => {
    return (dispatch: TDispatch): ActionType => {
        return dispatch({
            type: TURN_PAGE,
            payload: { page, shouldFetch }
        });
    };
};

const setPerPage: ActionCreate = (per_page: number) => {
    return (dispatch: TDispatch): ActionType => {
        return dispatch({
            type: TURN_PAGE,
            payload: { per_page }
        });
    };
};

export default { getSearch, setSearchQuery, setPage, setPerPage };
