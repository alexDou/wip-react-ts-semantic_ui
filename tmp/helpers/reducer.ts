/**
 * Allows for Object type of handlers
 * @author Vladimir Shestakov boolive@yandex.ru
 *
 * @param initState Object
 * @param handlers Object
 * @return Function Typical reducer
 */
export default function reducer(initState, handlers) {
    return (state = initState, action = {}) => {
        if (handlers[action.type]) {
            return handlers[action.type](state, action);
        }

        return state;
    };
}
