import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import GTAReducer from './slice'

export function makeStore() {
    return configureStore({
        reducer: { GTAStore: GTAReducer },
    })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export default store
