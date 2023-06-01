import {Action,configureStore,ThunkAction} from '@reduxjs/toolkit'
import newsReducer from '@/features/News/newsSlice'
export const store = configureStore({
    reducer:{
        newsData:newsReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState= ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void>=ThunkAction<
ReturnType,RootState,unknown,Action<string>>;