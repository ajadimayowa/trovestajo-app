import { Alert } from 'react-native';
import { call, put } from 'redux-saga/effects'
import { getAgentArtisan } from '../requests/requests'
import { getAgentArtisanSuccess, getArtisanFailure } from '../slices/artisan.slice'

export function* getArtisanSaga(action) {
    try {
        const response = yield call(getAgentArtisan, action.payload);
        const { success, message, data } = response.data;
        if (success === true) {
            const payload = {
                data,
                message: message,
                success: success,
                isLoading: false
            }
            yield put(getAgentArtisanSuccess(payload));
        }
        else {
            const payload = {
                data: [],
                message: message,
                success: success,
                isLoading: false
            }
            yield put(getArtisanFailure(payload));
        }
    } catch (error) {
        const payload = {
            data: [],
            message: error.message,
            success: false,
            isLoading: false
        }
        yield put(getArtisanFailure(payload));
    }
}
