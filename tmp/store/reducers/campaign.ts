import reducer from '@helpers/reducer';
import { GET_SEARCH } from '../action_types';
import { SearchState } from '@t/app';

const initialState: SearchState = {
    repos: {},
    page: 1
};

export default reducer(initialState, {
    [GET_SEARCH]: (state: SearchState, action: SearchAction) => {
        return {
            ...state,
            overview: action.payload
        };
    }
});
