import reducer from '@helpers/reducer';
import { SearchState, SearchAction } from '@t/app';
import apiConfig from '@api/api.config';

const initialState: SearchState = {
    mutation: 1,
    query: '',
    repos: {},
    page: 1,
    per_page: apiConfig.defaults.per_page,
    shouldFetch: false
};

export default reducer(initialState, {
    ['DEFAULT']: (state: SearchState, action: SearchAction) => {
        return {
            ...state,
            ...action.payload
        };
    }
});
