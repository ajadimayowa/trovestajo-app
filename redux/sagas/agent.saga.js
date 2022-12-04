import { call, put } from 'redux-saga/effects'
import { loginAgent } from '../requests/requests'
import { getAgentSuccess, getAgentFailure } from '../slices/agent.slice'

export function* getAgentSaga(action) {
    try {
        const response = yield call(loginAgent, action.payload);
        const { success, message, data,token } = response.data;
        if (success === true) {
            yield put(getAgentSuccess({ payload: data, isLoading: false, message: message, token }));
        }
        else {
            yield put(getAgentFailure({ payload: {}, success, message: message, isLoading: false }));
        }
    } catch (error) {
        yield put(getAgentFailure({ payload: {}, message: error.message, isLoading: false }));
    }
}
