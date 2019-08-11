import { TDispatch, ActionType, ActionCreate, ThunkActionCreate } from '@t/app';
import { api } from '@api/index';
import { session } from './';
import { CALL_SEARCH, FIND_QUERY, TURN_PAGE } from '../action_types';

const getSearch: ThunkActionCreate = (query: string, page: number) => {

    return async (dispatch: TDispatch): Promise<ActionType> => {
        try {
            dispatch(session.pending());
            const response: any = await api.search_repos(query, page);

            dispatch({
                type: CALL_SEARCH,
                payload: {
                    page,
                    repos: response.data,
                    shouldFetch: false
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
            payload: { display: {}, query, repos: {}, shouldFetch: true }
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

export default { getSearch, setSearchQuery, setPage };
