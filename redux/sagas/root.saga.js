import { takeLatest, all } from "redux-saga/effects";
import { getAgentSaga } from './agent.saga'
import { getArtisanSaga } from './artisan.saga'


export function* watcherSaga() {
  yield all([
    takeLatest('agent/getAgentData', getAgentSaga),
    takeLatest('artisans/getArtisanData', getArtisanSaga),
  ])
}