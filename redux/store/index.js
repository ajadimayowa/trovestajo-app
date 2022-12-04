import { configureStore, combineReducers } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import agentReducer from '../slices/agent.slice'
import artisanReducer from '../slices/artisan.slice'
import { watcherSaga } from '../sagas/root.saga'
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from 'redux-persist/es/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage:AsyncStorage,
};

const saga = createSagaMiddleware()
const rootReducers = combineReducers({
    agent: agentReducer,
    artisan: artisanReducer,
})
// const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = configureStore({
    reducer: rootReducers,
    middleware: [saga]
})

saga.run(watcherSaga)

export default store